import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "../../styles/minicalendar.css";

export default function MiniCalendar({ selectedDate, onSelect }) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let day = startDate;

  while (day <= endDate) {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const cloneDay = day;

      days.push(
        <div
          key={cloneDay}
          className={`mc-day 
            ${!isSameMonth(cloneDay, monthStart) ? "mc-other" : ""}
            ${isSameDay(cloneDay, selectedDate) ? "mc-selected" : ""}`}
          onClick={() => onSelect(cloneDay)}
        >
          {format(cloneDay, "d")}
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className="mc-week" key={day}>
        {days}
      </div>
    );
  }

  return (
    <div className="mini-calendar">
      <div className="mc-header">
        <span>{format(selectedDate, "MMMM yyyy")}</span>
      </div>

      <div className="mc-weekdays">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="mc-weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="mc-body">{rows}</div>
    </div>
  );
}
