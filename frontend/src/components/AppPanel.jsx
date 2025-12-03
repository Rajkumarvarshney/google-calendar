import React from "react";
import "../styles/appPanel.css";

import NotesApp from "./apps/NotesApp";
import TasksApp from "./apps/TasksApp";
import ContactsApp from "./apps/ContactsApp";
import MapsApp from "./apps/MapsApp";

export default function AppPanel({ app, close }) {
  if (!app) return null;

  return (
    <div className="app-panel">
      <div className="app-header">
        <h2>
          {app === "keep"
            ? "Keep Notes"
            : app === "tasks"
            ? "Tasks"
            : app === "contacts"
            ? "Contacts"
            : app === "maps"
            ? "Google Maps"
            : ""}
        </h2>

        <button className="close-btn" onClick={close}>
          ×
        </button>
      </div>

      <div className="app-body">
        {app === "keep" && <NotesApp />}
        {app === "tasks" && <TasksApp />}
        {app === "contacts" && <ContactsApp />}
        {app === "maps" && <MapsApp />}
      </div>
    </div>
  );
}
