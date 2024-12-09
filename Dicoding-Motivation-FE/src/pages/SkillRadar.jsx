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
import { useState, useEffect } from 'react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function SkillRadar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/your-endpoint")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
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

  const radarData = {
    labels: data.radar_data.labels,
    datasets: [
      {
        label: "Skill Level",
        data: data.radar_data.values,
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
        suggestedMax: Math.max(...data.radar_data.max_values),
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
          <Radar data={radarData} options={options} />
        </div>

        {/* Recommended Courses Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/3">
          <h2 className="text-2xl font-bold text-primary mb-4">Recommended Courses</h2>
          <div className="space-y-4">
            {data.recommended_courses.map((course, index) => (
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
