import { useState } from "react";
import ManualForm from "./components/ManualForm";
import DatasetForm from "./components/DatasetForm";
import NasaForm from "./components/NasaForm";

function App() {
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">

      
      {/* HEADER */}
      <div className="mb-10 glass-card p-8">
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
    ☄️ Asteroid Hazard Prediction
  </h1>

  <p className="mt-3 text-gray-400 text-lg">
    ML-powered asteroid risk analysis
  </p>
</div>


      {/* TABS */}
      <div className="max-w-5xl mx-auto mb-6 flex gap-4">
        {[
          { key: "manual", label: "Manual Input" },
          { key: "dataset", label: "Dataset" },
          { key: "nasa", label: "NASA Live" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              activeTab === tab.key
                ? "bg-cyan-500 text-black"
                : "bg-black/40 border border-white/10 text-gray-300 hover:bg-black/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        {activeTab === "manual" && <ManualForm />}
        {activeTab === "dataset" && <DatasetForm />}
        {activeTab === "nasa" && <NasaForm />}
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm mt-12">
        MCA ML Project · FastAPI · React · XGBoost
      </div>
    </div>
  );
}

export default App;
