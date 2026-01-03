function ResultCard({ result }) {
  if (!result) return null;

  const isHazardous = result.prediction === "Hazardous";

  return (
    <div
      className={`mt-8 p-6 rounded-xl text-center border
        ${
          isHazardous
            ? "bg-red-500/10 border-red-500 text-red-400"
            : "bg-green-500/10 border-green-500 text-green-400"
        }`}
    >
      <h3 className="text-2xl font-bold">
        {isHazardous ? "⚠️ Hazardous Asteroid" : "✅ Not Hazardous"}
      </h3>

    </div>
  );
}

export default ResultCard;
