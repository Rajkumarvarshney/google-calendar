import React, { useEffect, useRef } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import {
  startOfWeek,
  addDays,
  format,
  setHours,
  setMinutes,
  isSameDay,
  isToday
} from "date-fns";
import "../styles/weekview.css";

export default function WeekView() {
  const { state, dispatch } = useCalendarContext();
  const containerRef = useRef();

  const weekStart = startOfWeek(state.selectedDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const openEventModal = (day, hour) => {
    const date = new Date(day);
    const start = setMinutes(setHours(date, hour), 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    dispatch({
      type: "SET_TEMP_EVENT",
      payload: { start, end }
    });
    dispatch({ type: "OPEN_EVENT_MODAL" });
  };

  useEffect(() => {
    const now = new Date();
    if (now.toDateString() === state.selectedDate.toDateString()) {
      if (containerRef.current) {
        containerRef.current.scrollTop = now.getHours() * 120;
      }
    }
  }, [state.selectedDate]);

  return (
    <div className="weekview-container" ref={containerRef}>
      {/* WEEK HEADER */}
      <div className="weekview-header">
        {days.map((day, i) => {
          const today = isToday(day);
          return (
            <div className="weekview-header-col" key={i}>
              <div
                className={`weekview-day-name ${
                  today ? "today-text" : ""
                }`}
              >
                {format(day, "EEE").toUpperCase()}
              </div>

              <div
                className={`weekview-day-number ${
                  today ? "today-circle" : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_DATE",
                    payload: day
                  })
                }
              >
                {format(day, "d")}
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="weekview-grid">
        {/* TIME COLUMN */}
        <div className="weekview-time-col">
          {hours.map((h) => (
            <div className="weekview-time-cell" key={h}>
              {format(setHours(new Date(), h), "h a")}
            </div>
          ))}
        </div>

        {/* DAY COLUMNS */}
        <div className="weekview-days">
          {days.map((day, dayIndex) => (
            <div className="weekview-day-col" key={dayIndex}>
              {hours.map((hour) => (
                <div
                  className="weekview-cell"
                  key={hour}
                  onClick={() => openEventModal(day, hour)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <WeekCurrentTimeIndicator days={days} />
    </div>
  );
}

function WeekCurrentTimeIndicator({ days }) {
  const now = new Date();
  const todayIndex = days.findIndex((d) => isSameDay(d, now));
  if (todayIndex === -1) return null;

  const top = now.getHours() * 120 + (now.getMinutes() * 120) / 60;
  const left = todayIndex * 150 + 70; // timeline + spacing

  return (
    <div className="week-current-time" style={{ top, left }}>
      <div className="circle"></div>
    </div>
  );
}

