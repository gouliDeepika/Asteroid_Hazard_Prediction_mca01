import FeatureImportanceChart from "./FeatureImportanceChart";
import { useEffect, useState } from "react";
import {
  fetchNasaAsteroids,
  fetchNasaAsteroidById,
  predictUnified,
} from "../services/api";
import ResultCard from "./ResultCard";
import { fetchShapExplanation } from "../services/api";
import ShapChart from "./ShapChart";
import ProbabilityGauge from "./ProbabilityGauge";

function NasaForm() {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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

  useEffect(() => {
    fetchNasaAsteroids()
      .then((res) => setAsteroids(res.data))
      .catch(() => alert("Failed to load NASA asteroids"));
  }, []);

  const handleSelect = async (id) => {
    setSelectedId(id);
    setResult(null);

    if (!id) return;

    try {
      const res = await fetchNasaAsteroidById(id);
      setFormData(res.data);
    } catch {
      alert("Failed to fetch NASA asteroid details");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    for (let key in formData) {
      if (formData[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await predictUnified({
        source: "nasa",
        absolute_magnitude: Number(formData.absolute_magnitude),
        estimated_diameter_min: Number(formData.estimated_diameter_min),
        estimated_diameter_max: Number(formData.estimated_diameter_max),
        relative_velocity: Number(formData.relative_velocity),
        miss_distance: Number(formData.miss_distance),
      });

      setResult(response.data);
    } catch {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-cyan-400 mb-6">
        🛰️ NASA Live Asteroids (Editable)
      </h3>

      {/* Dropdown */}
      <div className="mb-6">
        <label className="text-sm text-gray-400">Select NASA Asteroid</label>
        <select
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40
          border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">-- Choose an asteroid --</option>
          {asteroids.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} (ID: {a.id})
            </option>
          ))}
        </select>
      </div>

      {/* Editable fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["absolute_magnitude", "Absolute Magnitude (H)"],
          ["estimated_diameter_min", "Diameter Min (km)"],
          ["estimated_diameter_max", "Diameter Max (km)"],
          ["relative_velocity", "Relative Velocity (km/h)"],
          ["miss_distance", "Miss Distance (km)"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="text-sm text-gray-400">{label}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-black/40
              border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-semibold
          hover:bg-cyan-400 transition disabled:opacity-50"
        >
          {loading ? "Predicting..." : "🔮 Predict Hazard"}
        </button>
      </div>

      <ResultCard result={result} />
{result && result.probability !== undefined && (
  <ProbabilityGauge probability={result.probability} />
)}
{result && <FeatureImportanceChart />}
{result && (
  <div className="text-center mt-4">
    <button
      onClick={async () => {
        const res = await fetchShapExplanation({
          source: "nasa",
          ...Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [k, Number(v)])
          ),
        });
        setShapData(res.data);
      }}
      className="px-6 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-400"
    >
      🧠 Explain Prediction (SHAP)
    </button>
  </div>
)}

<ShapChart data={shapData} />

    </div>
  );
}

export default NasaForm;
