import React from "react";
import "../../styles/bookingschedule.css";
import { FiClock } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function BookingSchedulePanel({ open, onClose }) {
  if (!open) return null;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bs-overlay">
      <div className="bs-panel">
        <div className="bs-header">
          <IoClose className="bs-close" onClick={onClose} />
          <h3>BOOKABLE APPOINTMENT SCHEDULE</h3>
        </div>

        <div className="bs-content">
          <h2 className="bs-title">Add title</h2>

          {/* Appointment Duration */}
          <div className="bs-section">
            <label className="bs-label">
              <FiClock /> Appointment duration
            </label>

            <select className="bs-input">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
            </select>
          </div>

          {/* Availability */}
          <div className="bs-section">
            <label className="bs-label">
              <FiClock /> General availability
            </label>

            <select className="bs-input">
              <option>Repeat weekly</option>
              <option>Custom</option>
            </select>

            {/* DAYS */}
            <div className="bs-days">
              {days.map((d) => (
                <div className="bs-day-row" key={d}>
                  <span className="bs-day">{d}</span>

                  {d === "Sun" || d === "Sat" ? (
                    <span className="bs-unavailable">Unavailable</span>
                  ) : (
                    <div className="bs-time-row">
                      <input type="time" defaultValue="09:00" />
                      <span>—</span>
                      <input type="time" defaultValue="17:00" />

                      <button className="bs-icon-btn">➕</button>
                      <button className="bs-icon-btn">✖</button>
                      <button className="bs-icon-btn">📄</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className="bs-section">
            <select className="bs-input">
              <option>(GMT+05:30) India Standard Time – Kolkata</option>
            </select>
          </div>
        </div>

        <button className="bs-next-btn">Next</button>
      </div>
    </div>
  );
}


