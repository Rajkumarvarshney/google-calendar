import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarContext } from "../context/CalendarContext";
import { format } from "date-fns";
import {
  AiOutlineAlignLeft,
  AiOutlineClose,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdOutlineAlarm } from "react-icons/md";
import { MdCalendarToday } from "react-icons/md";

export default function TaskModal() {
  const { state, dispatch } = useCalendarContext();

  if (!state.taskModal) return null;

  const close = () => dispatch({ type: "CLOSE_ALL_MODALS" });

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const saveTask = () => {
    console.log({
      title,
      deadline,
      description,
      date: state.selectedDate,
    });
    close();
  };

  return (
    <AnimatePresence>
      {state.taskModal && (
        <motion.div
          className="event-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="event-sheet"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="sheet-header">
              <input
                className="sheet-title-input"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <AiOutlineClose className="close-btn" onClick={close} />
            </div>

            {/* TABS */}
            <div className="sheet-tabs">
              <div className="tab">Event</div>
              <div className="tab active">Task</div>
              <div className="tab">
                Appointment schedule <span className="new-badge">New</span>
              </div>
            </div>

            {/* DATE / TIME ROW */}
            <div className="sheet-row">
              <AiOutlineCalendar className="sheet-icon" />
              <div className="sheet-row-content">
                <div className="date-text">
                  {format(state.selectedDate, "EEEE, MMMM d")}
                </div>
                <div className="sub-text">Does not repeat</div>
              </div>
            </div>

            {/* ADD DEADLINE */}
            <div className="sheet-row">
              <MdOutlineAlarm className="sheet-icon" />
              <div className="sheet-row-content">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="task-input"
                  placeholder="Add deadline"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="sheet-row">
              <AiOutlineAlignLeft className="sheet-icon" />
              <textarea
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-box"
              />
            </div>

            {/* TASK LIST */}
            <div className="sheet-row">
              <AiOutlineCalendar className="sheet-icon" />
              <div className="sheet-row-content">
                <select className="task-dropdown">
                  <option>My Tasks</option>
                  <option>Personal</option>
                  <option>Work</option>
                </select>
              </div>
            </div>

            {/* USER INFO */}
            <div className="sheet-row">
              <MdCalendarToday className="sheet-icon" />
              <div className="calendar-picker">
                <div className="calendar-circle" />
                Aryan Varshney
                <div className="calendar-sub">Free · Private</div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="sheet-footer">
              <div></div>
              <button className="save-btn" onClick={saveTask}>
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
