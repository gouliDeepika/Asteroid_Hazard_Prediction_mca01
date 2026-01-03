import { useEffect, useState } from "react";
import { fetchFeatureImportance } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function FeatureImportanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFeatureImportance()
      .then((res) => setData(res.data))
      .catch(() => alert("Failed to load feature importance"));
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="mt-10 bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">
        📊 Feature Importance (XGBoost)
      </h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#cbd5f5" />
            <YAxis
              dataKey="feature"
              type="category"
              width={140}
              stroke="#cbd5f5"
            />
            <Tooltip />
            <Bar dataKey="importance" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeatureImportanceChart;
