import React, { useEffect, useRef } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import { format, setHours, setMinutes } from "date-fns";
import "../styles/dayview.css";

export default function DayView() {
  const { state, dispatch } = useCalendarContext();
  const containerRef = useRef();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const openEventModal = (hour, minute = 0) => {
    const date = new Date(state.selectedDate);
    const start = setMinutes(setHours(date, hour), minute);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    dispatch({
      type: "SET_TEMP_EVENT",
      payload: { start, end },
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
    <div className="dayview-container" ref={containerRef}>
      <div className="dayview-header">
        <div className="dayview-day-name">
          {format(state.selectedDate, "EEEE")}
        </div>
        <div className="dayview-day-number">
          {format(state.selectedDate, "d")}
        </div>
      </div>

      <div className="dayview-grid">
        {hours.map((h) => (
          <div
            className="dayview-row"
            key={h}
            onClick={() => openEventModal(h)}
          >
            <div className="dayview-time">
              {format(setHours(new Date(), h), "h a")}
            </div>

            <div className="dayview-cell" />
          </div>
        ))}
      </div>

      <CurrentTimeIndicator selectedDate={state.selectedDate} />
    </div>
  );
}

function CurrentTimeIndicator({ selectedDate }) {
  const now = new Date();
  if (now.toDateString() !== selectedDate.toDateString()) return null;

  const top = now.getHours() * 120 + (now.getMinutes() * 120) / 60;

  return (
    <div className="current-time-line" style={{ top }}>
      <div className="circle" />
    </div>
  );
}

