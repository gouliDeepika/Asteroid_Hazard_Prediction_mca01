import { useState } from "react";
import { predictUnified, fetchShapExplanation } from "../services/api";

import ResultCard from "./ResultCard";
import ProbabilityGauge from "./ProbabilityGauge";
import FeatureImportanceChart from "./FeatureImportanceChart";
import ShapChart from "./ShapChart";

function ManualForm() {
  const [formData, setFormData] = useState({
    absolute_magnitude: "",
    estimated_diameter_min: "",
    estimated_diameter_max: "",
    relative_velocity: "",
    miss_distance: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [shapData, setShapData] = useState(null);
  const [explaining, setExplaining] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Prediction
  const handlePredict = async () => {
    // Basic validation
    for (let key in formData) {
      if (formData[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    setLoading(true);
    setResult(null);
    setShapData(null);

    try {
      const response = await predictUnified({
        source: "manual",
        absolute_magnitude: Number(formData.absolute_magnitude),
        estimated_diameter_min: Number(formData.estimated_diameter_min),
        estimated_diameter_max: Number(formData.estimated_diameter_max),
        relative_velocity: Number(formData.relative_velocity),
        miss_distance: Number(formData.miss_distance),
      });

      setResult(response.data);
    } catch (error) {
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // SHAP Explain
  const handleExplain = async () => {
    setExplaining(true);

    try {
      const res = await fetchShapExplanation({
        source: "manual",
        absolute_magnitude: Number(formData.absolute_magnitude),
        estimated_diameter_min: Number(formData.estimated_diameter_min),
        estimated_diameter_max: Number(formData.estimated_diameter_max),
        relative_velocity: Number(formData.relative_velocity),
        miss_distance: Number(formData.miss_distance),
      });

      setShapData(res.data);
    } catch {
      alert("SHAP explanation failed");
    } finally {
      setExplaining(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-cyan-400 mb-6">
        ✍️ Manual Asteroid Parameters
      </h3>

      {/* Input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["absolute_magnitude", "Absolute Magnitude (H)", "22.4"],
          ["estimated_diameter_min", "Diameter Min (km)", "0.12"],
          ["estimated_diameter_max", "Diameter Max (km)", "0.30"],
          ["relative_velocity", "Relative Velocity (km/h)", "48000"],
          ["miss_distance", "Miss Distance (km)", "600000"],
        ].map(([key, label, placeholder]) => (
          <div key={key}>
            <label className="text-sm text-gray-400">{label}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40
              border border-white/10 focus:outline-none focus:ring-2
              focus:ring-cyan-500"
            />
          </div>
        ))}
      </div>

      {/* Predict button */}
      <div className="mt-8 text-center">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-cyan-500 text-black
          font-semibold hover:bg-cyan-400 transition
          disabled:opacity-50"
        >
          {loading ? "Predicting..." : "🔮 Predict Hazard"}
        </button>
      </div>

      {/* Result */}
      <ResultCard result={result} />

      {/* Probability Gauge */}
      {result && result.probability !== undefined && (
        <ProbabilityGauge probability={result.probability} />
      )}

      {/* Feature Importance */}
      {result && <FeatureImportanceChart />}

      {/* SHAP Explain Button */}
      {result && (
        <div className="text-center mt-6">
          <button
            onClick={handleExplain}
            disabled={explaining}
            className="px-6 py-2 rounded-lg border
            border-purple-400 text-purple-300
            hover:bg-purple-400/10 transition
            disabled:opacity-50"
          >
            {explaining ? "Explaining..." : "🧠 Explain Prediction (SHAP)"}
          </button>
        </div>
      )}

      {/* SHAP Chart */}
      <ShapChart data={shapData} />
    </div>
  );
}

export default ManualForm;
