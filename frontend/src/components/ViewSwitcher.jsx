import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarContext } from "../context/CalendarContext";

export default function ViewSwitcher({ open, onClose }) {
  const { state, dispatch } = useCalendarContext();
  const ref = useRef();

  // close on outside
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const views = [
    { label: "Day", key: "day", hotkey: "D" },
    { label: "Week", key: "week", hotkey: "W" },
    { label: "Month", key: "month", hotkey: "M" },
    { label: "Year", key: "year", hotkey: "Y" },
    { label: "Schedule", key: "schedule", hotkey: "A" },
    { label: "4 days", key: "4days", hotkey: "X" },
  ];

  const changeView = (v) => {
    dispatch({ type: "SET_VIEW", payload: v });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="view-menu"
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.12 }}
        >
          {views.map((v) => (
            <div
              key={v.key}
              className="view-item"
              onClick={() => changeView(v.key)}
            >
              <div>{v.label}</div>
              <div className="hotkey">{v.hotkey}</div>
            </div>
          ))}

          <hr className="view-divider" />

          {/* Show Weekends */}
          <div
            className="view-item"
            onClick={() => dispatch({ type: "TOGGLE_WEEKENDS" })}
          >
            <div>
              {state.showWeekends ? "✔" : ""} Show weekends
            </div>
          </div>

          {/* Show declined events */}
          <div
            className="view-item"
            onClick={() => dispatch({ type: "TOGGLE_DECLINED" })}
          >
            <div>
              {state.showDeclined ? "✔" : ""} Show declined events
            </div>
          </div>

          {/* Show completed tasks */}
          <div
            className="view-item"
            onClick={() => dispatch({ type: "TOGGLE_COMPLETED" })}
          >
            <div>
              {state.showCompletedTasks ? "✔" : ""} Show completed tasks
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

