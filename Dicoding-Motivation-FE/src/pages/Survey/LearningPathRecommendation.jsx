export default function LearningPathRecommendation({ recommendations }) {
  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-auto">
      <h1 className="text-3xl font-bold text-center my-4" style={{ color: '#2D3E50' }}>
        Learning Path Recommendation
      </h1>
      <div className="space-y-4 mx-6 mb-8">
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow flex justify-between items-center"
            >
              <div className="flex-1 pr-6">
                <h2 className="text-xl font-bold text-primary mb-2">
                  {rec.title}
                </h2>
                <p className="text-gray-600">{rec.description}</p>
              </div>
              <button
                className="bg-button text-white py-2 px-6 rounded-md hover:bg-accent/90 transition-colors font-medium whitespace-nowrap h-fit"
                onClick={() => {
                  console.log(`Navigating to ${rec.title} title`);
                }}
              >
                Belajar
              </button>
            </div>
          ))
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
}

