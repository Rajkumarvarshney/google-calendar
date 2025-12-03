import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarContext } from "../context/CalendarContext";
import {
  AiOutlineClockCircle,
  AiOutlineClose
} from "react-icons/ai";
import { format } from "date-fns";

export default function AppointmentModal() {
  const { state, dispatch } = useCalendarContext();
  if (!state.appointmentModal) return null;

  const close = () => dispatch({ type: "CLOSE_ALL_MODALS" });

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("60");

  const WEEKS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [availability, setAvailability] = useState({
    Mon: [{ start: "09:00", end: "17:00" }],
    Tue: [{ start: "09:00", end: "17:00" }],
    Wed: [{ start: "09:00", end: "17:00" }],
    Thu: [{ start: "09:00", end: "17:00" }],
    Fri: [{ start: "09:00", end: "17:00" }],
    Sun: [],
    Sat: [],
  });

  const updateTime = (day, index, field, val) => {
    const newSlots = [...availability[day]];
    newSlots[index][field] = val;
    setAvailability({ ...availability, [day]: newSlots });
  };

  const addSlot = (day) => {
    const newSlots = [...availability[day], { start: "09:00", end: "17:00" }];
    setAvailability({ ...availability, [day]: newSlots });
  };

  const removeSlot = (day, index) => {
    const newSlots = availability[day].filter((_, i) => i !== index);
    setAvailability({ ...availability, [day]: newSlots });
  };

  const cloneSlot = (day, index) => {
    const newSlots = [...availability[day], { ...availability[day][index] }];
    setAvailability({ ...availability, [day]: newSlots });
  };

  return (
    <AnimatePresence>
      {state.appointmentModal && (
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

            <div className="appt-subtitle">BOOKABLE APPOINTMENT SCHEDULE</div>

            {/* DURATION */}
            <div className="appt-section">
              <div className="appt-label-row">
                <AiOutlineClockCircle className="sheet-icon" />
                <div>
                  <div className="appt-title">Appointment duration</div>
                  <div className="appt-sub">How long should each appointment last?</div>
                </div>
              </div>

              <select
                className="appt-dropdown"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <hr className="divider" />

            {/* GENERAL AVAILABILITY */}
            <div className="appt-section">
              <div className="appt-label-row">
                <AiOutlineClockCircle className="sheet-icon" />
                <div>
                  <div className="appt-title">General availability</div>
                  <div className="appt-sub">
                    Set when you're regularly available for appointments.
                  </div>
                </div>
              </div>

              <select className="appt-dropdown">
                <option>Repeat weekly</option>
              </select>

              {/* Weekly rows */}
              {WEEKS.map((day) => (
                <div className="day-row" key={day}>
                  <div className="day-name">{day}</div>

                  {availability[day].length === 0 ? (
                    <div className="unavailable">Unavailable</div>
                  ) : (
                    availability[day].map((slot, idx) => (
                      <div className="slot-row" key={idx}>
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTime(day, idx, "start", e.target.value)}
                        />
                        <span className="dash">—</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTime(day, idx, "end", e.target.value)}
                        />
                        <button className="slot-btn" onClick={() => removeSlot(day, idx)}>⛔</button>
                        <button className="slot-btn" onClick={() => addSlot(day)}>➕</button>
                        <button className="slot-btn" onClick={() => cloneSlot(day, idx)}>📄</button>
                      </div>
                    ))
                  )}

                  {availability[day].length === 0 && (
                    <button className="slot-btn" onClick={() => addSlot(day)}>➕</button>
                  )}
                </div>
              ))}

              {/* Timezone */}
              <select className="appt-dropdown timezone">
                <option>(GMT+05:30) India Standard Time - Kolkata</option>
              </select>
            </div>

            <div className="appt-footer">
              <button className="next-btn">Next</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
