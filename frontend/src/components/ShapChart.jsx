import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

function ShapChart({ data }) {
  if (!data || data.length === 0) return null;

  // Sort by absolute SHAP value (importance)
  const sortedData = [...data].sort(
    (a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value)
  );

  return (
    <div className="mt-8 bg-black/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">
        🧠 SHAP Explainability (Local Explanation)
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        Positive values increase hazard risk, negative values reduce it.
      </p>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            {/* Zero reference */}
            <ReferenceLine x={0} stroke="#94a3b8" />

            <XAxis
              type="number"
              stroke="#cbd5f5"
              tick={{ fill: "#cbd5f5" }}
            />

            <YAxis
              dataKey="feature"
              type="category"
              width={140}
              stroke="#cbd5f5"
              tick={{ fill: "#cbd5f5" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                color: "#e5e7eb",
              }}
            />

            <Bar
              dataKey="shap_value"
              radius={[6, 6, 6, 6]}
              fill="#a20ca0ff"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ShapChart;
