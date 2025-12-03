import React, { useState } from "react";
import MiniCalendar from "../calendar/MiniCalendar";
import { FiChevronDown, FiChevronRight, FiMoreVertical } from "react-icons/fi";
import BookingSchedulePanel from "../events/BookingSchedulePanel";
import CalendarColorMenu from "../CalendarColorMenu";

import { useCalendarContext } from "../../context/CalendarContext";
import { useUIContext } from "../../context/UIContext";

import "../../styles/layout.css";
import "../../styles/sidebar.css";

export default function Sidebar() {
  const { isSidebarOpen } = useUIContext(); // ✅ FIXED
  const { state, dispatch } = useCalendarContext();

  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);
  const [openBooking, setOpenBooking] = useState(false);
  const [colorMenu, setColorMenu] = useState(null);

  const [calendarColors, setCalendarColors] = useState({
    primary: "#1a73e8",
    birthdays: "#a142f4",
    tasks: "#f6bf26",
  });

  // Open color picker menu
  const openColorSelector = (e, key) => {
    const rect = e.target.getBoundingClientRect();
    setColorMenu({
      key,
      x: rect.left - 220,
      y: rect.top + 25,
    });
  };

  // Change calendar color
  const changeCalendarColor = (key, color) => {
    setCalendarColors((prev) => ({ ...prev, [key]: color }));
  };

  return (
    <aside className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
      {/* MINI CALENDAR */}
      <div className="sidebar-section">
        <MiniCalendar
          selectedDate={state.selectedDate}
          onSelect={(date) =>
            dispatch({ type: "SET_SELECTED_DATE", payload: date })
          }
        />
      </div>

      {/* SEARCH FOR PEOPLE */}
      <div className="sidebar-section">
        <div className="people-pill">
          <span className="people-pill-icon">👥</span>
          <span>Search for people</span>
        </div>
      </div>

      {/* BOOKING PAGES */}
      <div className="sidebar-section">
        <div className="sidebar-row" onClick={() => setOpenBooking(true)}>
          <span>Booking pages</span>
          <span className="plus-btn">+</span>
        </div>
      </div>

      {/* MY CALENDARS */}
      <div className="sidebar-section">
        <div
          className="section-row"
          onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}
        >
          <div className="section-title sidebar-title">My calendars</div>
          {myCalendarsOpen ? <FiChevronDown /> : <FiChevronRight />}
        </div>

        {myCalendarsOpen && (
          <div className="calendar-list">
            {["primary", "birthdays", "tasks"].map((key) => (
              <div className="cal-item" key={key}>
                <input type="checkbox" defaultChecked />

                <span
                  className="cal-color"
                  style={{ backgroundColor: calendarColors[key] }}
                />

                <span className="cal-label">
                  {key === "primary"
                    ? "Aryan Varshney"
                    : key === "birthdays"
                    ? "Birthdays"
                    : "Tasks"}
                </span>

                <FiMoreVertical
                  className="calendar-options-btn"
                  onClick={(e) => openColorSelector(e, key)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OTHER CALENDARS */}
      <div className="sidebar-section">
        <div
          className="section-row"
          onClick={() => setOtherCalendarsOpen(!otherCalendarsOpen)}
        >
          <div className="section-title sidebar-title">Other calendars</div>
          {otherCalendarsOpen ? <FiChevronDown /> : <FiChevronRight />}
        </div>

        {otherCalendarsOpen && (
          <div className="calendar-list">
            <label className="cal-item">
              <input type="checkbox" defaultChecked />
              <span className="cal-label">Holidays in India</span>
            </label>

            <label className="cal-item">
              <input type="checkbox" defaultChecked />
              <span className="cal-label">Holidays in India</span>
            </label>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <span>Terms</span>
        <span>·</span>
        <span>Privacy</span>
      </div>

      {/* BOOKING PANEL */}
      <BookingSchedulePanel
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      />

      {/* COLOR MENU */}
      {colorMenu && (
        <CalendarColorMenu
          position={{ x: colorMenu.x, y: colorMenu.y }}
          selectedColor={calendarColors[colorMenu.key]}
          setColor={(color) => changeCalendarColor(colorMenu.key, color)}
          onClose={() => setColorMenu(null)}
        />
      )}
    </aside>
  );
}
