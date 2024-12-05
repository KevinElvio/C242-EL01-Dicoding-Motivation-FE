import TitleHeader from "../components/TitleHeader";
import { useState, useEffect } from 'react';
import streakDayData from '../data/streak-day.json';
import { FaFire } from 'react-icons/fa';

export default function Streak() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(streakDayData);
  }, []);

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Streak" />
      {userData && (
        <div className="p-6 flex flex-col items-center bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-3xl shadow-xl lg:w-2/3 mx-auto mt-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-orange-200 opacity-30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-xl"></div>

          <h2 className="text-2xl font-extrabold text-primary mb-6 flex items-center z-10">
            <FaFire className="text-orange-500 mr-2 animate-bounce" />
            {userData.name}
          </h2>

          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg mb-4">
            🔥 Current Streak: <span>{userData.current_streak}</span> days
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg mb-6">
            🏆 Longest Streak: <span>{userData.longest_streak}</span> days
          </div>

          <p className="text-center text-gray-800 italic z-10">
            Amazing work, <span className="font-bold text-orange-600">{userData.name}</span>! Each day counts toward something bigger.
          </p>

          <div className="w-16 h-1 bg-orange-400 rounded-full my-4"></div>

          <div className="flex items-center justify-center mt-4">
            <FaFire className="text-orange-500 text-5xl animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
