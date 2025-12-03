import React from "react";
import { format, isSameDay } from "date-fns";
import { useCalendarContext } from "../context/CalendarContext";

export default function ScheduleView() {
  const { state } = useCalendarContext();
  const events = state.events || [];

  // Sort by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  // Group events by day
  const groups = {};
  sortedEvents.forEach((event) => {
    const dateKey = format(new Date(event.start), "yyyy-MM-dd");
    if (!groups[dataKey]) groups[dateKey] = [];
    groups[dateKey].push(event);
  });

  return (
    <div className="schedule-container">
      {Object.keys(groups).map((dateKey) => {
        const dayEvents = groups[dateKey];
        const date = new Date(dateKey);

        return (
          <div key={dateKey} className="schedule-day">
            {/* LEFT DATE HEADER */}
            <div className="schedule-date">
              <div className="schedule-date-number">{format(date, "d")}</div>
              <div className="schedule-date-meta">
                <div className="schedule-date-weekday">{format(date, "EEE")}</div>
                <div className="schedule-date-month">{format(date, "MMM")}</div>
              </div>
            </div>

            {/* EVENTS LIST */}
            <div className="schedule-events">
              {dayEvents.map((ev, idx) => (
                <div key={idx} className="schedule-event-row">
                  <div className="schedule-event-dot" style={{ background: ev.color || "#34a853" }}></div>
                  <div className="schedule-event-time">
                    {ev.allDay ? "All day" : format(new Date(ev.start), "h:mm a")}
                  </div>
                  <div className="schedule-event-title">{ev.title}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
