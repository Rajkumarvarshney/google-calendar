import React, { useState } from "react";
import { useCalendarContext } from "../context/CalendarContext";
import { useUIContext } from "../context/UIContext";
import { format, addDays, addMonths, addYears } from "date-fns";
import "../styles/navbar.css";

import { FiMenu, FiSearch, FiSettings, FiHelpCircle } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import CreateMenu from "../components/CreateMenu";

export default function Navbar() {
  const { state, dispatch } = useCalendarContext();
  const { toggleSearch } = useUIContext();
  const [showCreate, setShowCreate] = useState(false);

  const goToday = () => {
    dispatch({ type: "SET_SELECTED_DATE", payload: new Date() });
  };

  const goPrev = () => {
    let date = state.selectedDate;

    switch (state.currentView) {
      case "day":
        date = addDays(date, -1);
        break;
      case "week":
        date = addDays(date, -7);
        break;
      case "month":
        date = addMonths(date, -1);
        break;
      case "year":
        date = addYears(date, -1);
        break;
      default:
        break;
    }

    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  const goNext = () => {
    let date = state.selectedDate;

    switch (state.currentView) {
      case "day":
        date = addDays(date, 1);
        break;
      case "week":
        date = addDays(date, 7);
        break;
      case "month":
        date = addMonths(date, 1);
        break;
      case "year":
        date = addYears(date, 1);
        break;
      default:
        break;
    }

    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  return (
    <div className="gc-nav">
      {/* LEFT SIDE */}
      <div className="gc-left">
        <FiMenu className="gc-icon" />

        <div className="gc-logo">
          <img src="/google-calendar-icon.png" alt="calendar" />
          <span>Calendar</span>
        </div>

        <button
          className="create-btn"
          onClick={() => setShowCreate(!showCreate)}
        >
          + Create ▾
        </button>

        {showCreate && (
          <CreateMenu onClose={() => setShowCreate(false)} />
        )}

        <button className="today-btn" onClick={goToday}>Today</button>

        <div className="arrow-box">
          <IoChevronBack className="chevron" onClick={goPrev} />
          <IoChevronForward className="chevron" onClick={goNext} />
        </div>

        <div className="gc-date">{format(state.selectedDate, "MMMM d, yyyy")}</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="gc-right">
        <FiSearch className="gc-icon" onClick={toggleSearch} />
        <FiHelpCircle className="gc-icon" />
        <FiSettings className="gc-icon" />

        <select
          className="view-select"
          value={state.currentView}
          onChange={(e) =>
            dispatch({ type: "SET_VIEW", payload: e.target.value })
          }
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="schedule">Schedule</option>
        </select>

        <BsGrid3X3Gap className="gc-icon" />

        <div className="gc-avatar">A</div>
      </div>
    </div>
  );
}
