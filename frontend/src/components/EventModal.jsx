import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarContext } from "../context/CalendarContext";
import { format } from "date-fns";
import {
  AiOutlineClockCircle,
  AiOutlineUserAdd,
  AiOutlineEnvironment,
  AiOutlineAlignLeft,
  AiOutlineClose,
} from "react-icons/ai";
import { MdVideoCall, MdCalendarToday } from "react-icons/md";

export default function EventModal() {
  const { state, dispatch } = useCalendarContext();

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("13:30");
  const [endTime, setEndTime] = useState("14:30");
  const [location, setLocation] = useState("");
  const [meetEnabled, setMeetEnabled] = useState(false);
  const [meetLink, setMeetLink] = useState("");

  if (!state.eventModal) return null;

  const close = () => dispatch({ type: "CLOSE_ALL_MODALS" });

  const generateMeetLink = () => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    const link = `https://meet.google.com/${id}`;
    setMeetLink(link);
    setMeetEnabled(true);
  };

  const saveEvent = () => {
    const eventData = {
      title,
      startTime,
      endTime,
      date: state.selectedDate,
      location,
      meetLink: meetEnabled ? meetLink : null,
    };

    console.log("Event Created:", eventData);
    close();
  };

  return (
    <AnimatePresence>
      {state.eventModal && (
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
            {/* Header */}
            <div className="sheet-header">
              <input
                className="sheet-title-input"
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <AiOutlineClose className="close-btn" onClick={close} />
            </div>

            {/* Tabs */}
            <div className="sheet-tabs">
              <div className="tab active">Event</div>
              <div className="tab">Task</div>
              <div className="tab">
                Appointment schedule
                <span className="new-badge">New</span>
              </div>
            </div>

            {/* Time row */}
            <div className="sheet-row">
              <AiOutlineClockCircle className="sheet-icon" />
              <div className="sheet-row-content">
                <div className="date-text">
                  {format(state.selectedDate, "EEEE, MMMM d")}
                </div>

                <div className="time-range">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <span className="dash">—</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                <div className="sub-text">Time zone · Does not repeat</div>
              </div>
            </div>

            {/* Guests */}
            <div className="sheet-row">
              <AiOutlineUserAdd className="sheet-icon" />
              <div className="sheet-row-content muted">Add guests</div>
            </div>

            {/* Location */}
            <div className="sheet-row">
              <AiOutlineEnvironment className="sheet-icon" />
              <input
                className="location-input"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Google Meet */}
            <div className="sheet-row meet-row">
              <MdVideoCall className="sheet-icon" color="#1A73E8" />

              {!meetEnabled ? (
                <div
                  className="meet-add"
                  onClick={generateMeetLink}
                >
                  Add Google Meet video conferencing
                </div>
              ) : (
                <div className="meet-info">
                  <div className="meet-link">{meetLink}</div>
                  <button
                    className="meet-remove"
                    onClick={() => {
                      setMeetEnabled(false);
                      setMeetLink("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sheet-row">
              <AiOutlineAlignLeft className="sheet-icon" />
              <div className="sheet-row-content muted">
                Add description or a Google Drive attachment
              </div>
            </div>

            {/* Calendar Picker */}
            <div className="sheet-row">
              <MdCalendarToday className="sheet-icon" />
              <div className="sheet-row-content calendar-picker">
                <div className="calendar-circle" />
                Aryan Varshney
                <div className="calendar-sub">
                  Busy · Default visibility · Notify 30 minutes before
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sheet-footer">
              <button className="more-options-btn">More options</button>
              <button className="save-btn" onClick={saveEvent}>
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
