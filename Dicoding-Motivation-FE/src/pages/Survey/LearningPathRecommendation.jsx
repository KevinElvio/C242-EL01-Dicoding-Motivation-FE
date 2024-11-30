import TitleHeader from "../../components/TitleHeader";
import recommendationsData from "../../data/learning-path-recommendations.json";

export default function LearningPathRecommendation() {
  const { recommendations } = recommendationsData;
  
  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Learning Path Recommendation" />
      <div className="space-y-4 mx-6 mb-8">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow flex justify-between items-center"
          >
            <div className="flex-1 pr-6">
              <h2 className="text-xl font-bold text-primary mb-2">
                {rec.title}
              </h2>
              <p className="text-gray-600">
                {rec.description}
              </p>
            </div>
            <button
              className="bg-button text-white py-2 px-6 rounded-md hover:bg-accent/90 transition-colors font-medium whitespace-nowrap h-fit"
              onClick={() => {
                console.log(`Navigating to ${rec.title} course`);
              }}
            >
              Belajar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}