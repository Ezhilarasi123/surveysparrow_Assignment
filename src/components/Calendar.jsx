
import React, { useState } from "react";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth())
  );
  const [events, setEvents] = useState({}); // {'YYYY-MM-DD': [{ title: '...', color: '...' }]}

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 201 }, (_, i) => 1950 + i);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length < 42) days.push(null);

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1));
  const handleYearChange = (e) =>
    setCurrentDate(new Date(parseInt(e.target.value), month));

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleAddEvent = (day) => {
    if (!day) return;
    const title = prompt("Enter event title (e.g., Project Review):");
    if (!title) return;

    const colors = ["bg-green-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-purple-500"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dateKey = formatDate(day);

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { title, color }]
    }));
  };

  return (
    <div className="w-full px-12 sm:px-6 lg:px-12 py-8 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex justify-center items-center">
      <div className="bg-cyan-200 w-full max-w-5xl min-w-[360px] h-[580px] rounded-2xl shadow-2xl p-6 flex flex-col justify-between">

        {/* Month + Year Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={goToPrevMonth} className="text-2xl p-2 rounded-full hover:bg-indigo-100 transition">◀️</button>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-indigo-700">{monthNames[month]}</h2>
            <select
              value={year}
              onChange={handleYearChange}
              className="text-xl font-semibold border border-violet-900 bg-fuchsia-100 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-600"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
          <button onClick={goToNextMonth} className="text-2xl p-2 rounded-full hover:bg-indigo-100 transition">▶️</button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-800 text-lg mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, idx) => (
            <div key={idx} className={`pb-1 ${idx === today.getDay() && month === today.getMonth() && year === today.getFullYear() ? "text-indigo-600 border-b-4 border-indigo-600 font-bold" : ""}`}>{dayName}</div>
          ))}
        </div>

        {/* Calendar Days */}
          <div className="grid grid-cols-7 grid-rows-6 gap-2 sm:gap-3 text-center text-lg sm:text-xl text-gray-900 flex-grow">


          {days.map((day, index) => {
            const isCurrentDay = isToday(day);
            const dateKey = day ? formatDate(day) : null;
            return (
              <div
                key={index}
                onClick={() => handleAddEvent(day)}
                className={`aspect-[1.3/1] w-full flex flex-col items-center justify-start 
                  rounded-xl cursor-pointer transition duration-200 ease-in-out transform 
                  ${isCurrentDay ? "bg-indigo-600 text-white font-bold scale-105 shadow-lg" : "bg-white hover:bg-indigo-100"} 
                  ${!day ? "cursor-default bg-transparent shadow-none" : ""}`}
              >
                <div className="mt-2">{day || ""}</div>

                {/* Show Today Badge */}
                {isCurrentDay && (
                  <span className="text-xs bg-white text-indigo-700 px-2 py-0.5 rounded-full mt-1 shadow font-semibold">
                    Today
                  </span>
                )}

                {/* Show Events */}
                {events[dateKey]?.map((event, i) => (
                  <div
                    key={i}
                    className={`text-xs mt-1 px-2 py-0.5 rounded-full text-white ${event.color} truncate max-w-[85%]`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
