import { useEffect, useState } from 'react';
import TitleHeader from "../components/TitleHeader";
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import skillRadarData from '../data/skill-radar.json';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillRadar() {
  const [radarData, setRadarData] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    // Get the user_name from skillRadarData
    const userName = skillRadarData.user_name;

    // Make the API request to fetch user progress data
    const fetchUserProgress = async () => {
      try {
        const response = await fetch('https://skillradarapi-989557955176.asia-southeast2.run.app/user-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_name: userName }),
        });

        if (response.ok) {
          const result = await response.json();
          setRadarData(result.radar_data); // Set the radar data from API response
          setRecommendedCourses(result.recommended_courses); // Set the recommended courses
        } else {
          console.error('Failed to fetch user progress data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProgress();
  }, []);

  if (!radarData) {
    return <div>Loading...</div>;
  }

  // Radar chart configuration
  const data = {
    labels: radarData.labels,
    datasets: [
      {
        label: "Skill Level",
        data: radarData.values,
        backgroundColor: "rgba(9, 154, 233, 0.2)",
        borderColor: "rgba(9, 154, 233, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...radarData.max_values),
        ticks: {
          stepSize: 0.2,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Quicksand',
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Skill Radar" />
      <div className="p-4 flex flex-col lg:flex-row gap-4">
        <div className="bg-white rounded-lg shadow-lg py-1 px-6 w-full lg:w-2/3 h-[425px] flex justify-center items-center">
          <Radar data={data} options={options} />
        </div>

        {/* Recommended Courses Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/3">
          <h2 className="text-2xl font-bold text-primary mb-4">Recommended Courses</h2>
          <div className="space-y-4">
            {recommendedCourses.map((course, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-sm font-semibold">{course}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
