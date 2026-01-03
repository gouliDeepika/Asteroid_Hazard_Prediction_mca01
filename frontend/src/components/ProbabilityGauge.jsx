function ProbabilityGauge({ probability }) {
  if (probability === null || probability === undefined) return null;

  const percent = Math.round(probability * 100);

  // Convert % to angle (0–180)
  const angle = (percent / 100) * 180;

  let color = "#22c55e"; // green
  let label = "Low Risk";

  if (percent >= 50 && percent < 70) {
    color = "#eab308"; // yellow
    label = "Moderate Risk";
  }
  if (percent >= 70) {
    color = "#ef4444"; // red
    label = "High Risk";
  }

  return (
    <div className="mt-8 bg-black/40 p-6 rounded-2xl border border-white/10">
      <h3 className="text-xl font-semibold text-cyan-400 text-center mb-4">
        🎯 Hazard Probability Gauge
      </h3>

      <div className="flex flex-col items-center">
        {/* SVG Gauge */}
        <svg width="260" height="140" viewBox="0 0 260 140">
          {/* Background arc */}
          <path
            d="M20 120 A110 110 0 0 1 240 120"
            fill="none"
            stroke="#374151"
            strokeWidth="12"
          />

          {/* Value arc */}
          <path
            d="M20 120 A110 110 0 0 1 240 120"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={`${(angle / 180) * 345} 345`}
            strokeLinecap="round"
          />

          {/* Needle */}
          <line
            x1="130"
            y1="120"
            x2={130 + 90 * Math.cos((Math.PI * (180 - angle)) / 180)}
            y2={120 - 90 * Math.sin((Math.PI * (180 - angle)) / 180)}
            stroke={color}
            strokeWidth="4"
          />

          {/* Center dot */}
          <circle cx="130" cy="120" r="6" fill={color} />
        </svg>

        {/* Text */}
        <p className="text-3xl font-bold mt-2" style={{ color }}>
          {percent}%
        </p>
        <p className="text-gray-300 mt-1">{label}</p>
        <p className="text-sm text-gray-400 mt-1">
          Probability of asteroid being hazardous
        </p>
      </div>
    </div>
  );
}

export default ProbabilityGauge;
