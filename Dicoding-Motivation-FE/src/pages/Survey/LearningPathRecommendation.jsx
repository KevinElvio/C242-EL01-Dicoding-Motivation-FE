import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader";

export default function LearningPathRecommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/users/recommendations") 
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setRecommendations(data.recommendations);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4 mx-6 mb-8">
      {recommendations.map((rec, index) => (
        <div 
          key={index}
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
  );
}