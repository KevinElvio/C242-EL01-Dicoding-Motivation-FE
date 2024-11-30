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
  const data = {
    labels: skillRadarData.labels,
    datasets: skillRadarData.datasets
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Quicksand'
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Skill Radar" />
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg py-1 px-6 max-w-xl mx-auto h-[400px] flex justify-center items-center">
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
