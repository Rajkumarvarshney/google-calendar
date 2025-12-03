import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth } from "date-fns";
import { useCalendarContext } from "../context/CalendarContext";
import "../styles/yearview.css";

export default function YearView() {
  const { state, dispatch } = useCalendarContext();

  const year = state.selectedDate.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => i);

  const buildMonthMatrix = (monthIndex) => {
    const firstDay = startOfMonth(new Date(year, monthIndex));
    const lastDay = endOfMonth(firstDay);

    const firstWeekStart = startOfWeek(firstDay, { weekStartsOn: 0 });
    const lastWeekEnd = endOfWeek(lastDay, { weekStartsOn: 0 });

    const rows = [];
    let current = firstWeekStart;

    while (current <= lastWeekEnd) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        row.push(current);
        current = addDays(current, 1);
      }
      rows.push(row);
    }

    return rows;
  };

  const changeDate = (date) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
    dispatch({ type: "SET_VIEW", payload: "day" });
  };

  return (
    <div className="yearview-container">
      {months.map((m) => {
        const monthName = format(new Date(year, m, 1), "LLLL");
        const matrix = buildMonthMatrix(m);

        return (
          <div className="year-month-block" key={m}>
            <div className="year-month-title">{monthName}</div>

            <div className="year-week-header">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="year-month-grid">
              {matrix.map((week, i) => (
                <div className="year-week-row" key={i}>
                  {week.map((day, j) => {
                    const isToday = isSameDay(day, new Date());
                    const isSelected = isSameDay(day, state.selectedDate);
                    const inMonth = isSameMonth(day, new Date(year, m, 1));

                    let className = "year-day-cell";
                    if (!inMonth) className += " other-month";
                    if (isSelected) className += " selected-day";
                    if (isToday) className += " today-day";

                    return (
                      <div
                        key={j}
                        className={className}
                        onClick={() => changeDate(day)}
                      >
                        {format(day, "d")}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

