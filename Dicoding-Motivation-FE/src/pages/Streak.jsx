import TitleHeader from "../components/TitleHeader";
import { useState, useEffect, useMemo } from 'react';
import { FaFire } from 'react-icons/fa';

export default function Streak() {
  const [currentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [consecutiveStreak, setConsecutiveStreak] = useState({
    count: 0,
    startDate: null,
    endDate: null,
    startMonth: null,
    endMonth: null
  });
  
  const streakDays = useMemo(() => [1, 3, 4, 10, 11, 12, 13, 14,15,16,17], []);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    let maxStreak = { count: 0, startDate: null, endDate: null, startMonth: null, endMonth: null };
    let currentStreak = { count: 0, startDate: null, endDate: null, startMonth: null, endMonth: null };
    
    streakDays.sort((a, b) => a - b).forEach((day, index) => {
      if (index === 0 || day !== streakDays[index - 1] + 1) {
        currentStreak = { 
          count: 1, 
          startDate: day, 
          endDate: day,
          startMonth: new Date(year, month).toLocaleString('default', { month: 'short' }),
          endMonth: new Date(year, month).toLocaleString('default', { month: 'short' })
        };
      } else {
        currentStreak.count++;
        currentStreak.endDate = day;
        currentStreak.endMonth = new Date(year, month).toLocaleString('default', { month: 'short' });
      }
      
      if (currentStreak.count > maxStreak.count) {
        maxStreak = { ...currentStreak };
      }
    });
    
    setConsecutiveStreak(maxStreak);
    
    const days = Array.from({ length: totalDays }, (_, i) => ({
      date: i + 1,
      hasStreak: streakDays.includes(i + 1),
      isConsecutive: i + 1 >= maxStreak.startDate && i + 1 <= maxStreak.endDate
    }));
    
    setDaysInMonth(days);
  }, [currentDate, streakDays]);

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Streak" />
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Calendar Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 lg:w-2/3">
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
            {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {daysInMonth.map((day) => (
              <div
                key={day.date}
                className={`aspect-square flex items-center justify-center relative ${
                  day.isConsecutive ? 'bg-orange-100/85' : ''
                }`}
              >
                {day.hasStreak && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center">
                      <FaFire className="text-orange-500 text-sm" />
                    </div>
                  </div>
                )}
                <span className={`z-10 text-sm ${day.hasStreak ? 'text-white' : 'text-gray-600'}`}>
                  {day.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Streak Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 h-fit text-center flex flex-col justify-center items-center lg:w-1/3">
          <h2 className="text-xl font-bold text-primary mb-4">Streak Stats</h2>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-orange-500">
              {consecutiveStreak.count} Days
            </p>
            <p className="text-base font-bold text-gray-600">
              {consecutiveStreak.startDate && 
                `${consecutiveStreak.startDate} ${consecutiveStreak.startMonth} - ${consecutiveStreak.endDate} ${consecutiveStreak.endMonth}`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
