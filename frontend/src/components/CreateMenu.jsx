import React from "react";
import { useCalendarContext } from "../context/CalendarContext";
import "../styles/createmenu.css";

export default function CreateMenu({ onClose }) {
  const { dispatch } = useCalendarContext();

  const openEvent = () => {
    dispatch({ type: "OPEN_EVENT_MODAL" });
    onClose();
  };

  const openTask = () => {
    dispatch({ type: "OPEN_TASK_MODAL" });
    onClose();
  };

  const openAppointment = () => {
    dispatch({ type: "OPEN_APPOINTMENT_MODAL" });
    onClose();
  };

  return (
    <div className="create-menu">
      <div className="menu-item" onClick={openEvent}>Event</div>
      <div className="menu-item" onClick={openTask}>Task</div>
      <div className="menu-item" onClick={openAppointment}>
        Appointment schedule <span className="new-tag">New</span>
      </div>
    </div>
  );
}

