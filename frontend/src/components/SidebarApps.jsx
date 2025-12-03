import React from "react";
import "../styles/sidebarApps.css";

import {
  MdLightbulb,
  MdCheckCircle,
  MdContacts,
  MdLocationOn,
} from "react-icons/md";

export default function SidebarApps({ openApp }) {
  return (
    <div className="apps-bar">
      <button onClick={() => openApp("tasks")}>
        <MdCheckCircle size={28} color="#4285f4" />
      </button>

      <button onClick={() => openApp("contacts")}>
        <MdContacts size={28} color="#4285f4" />
      </button>

      <button onClick={() => openApp("maps")}>
        <MdLocationOn size={28} color="#34a853" />
      </button>

      <button onClick={() => openApp("keep")}>
        <MdLightbulb size={28} color="#fbbc04" />
      </button>

      <div className="divider"></div>

      <button onClick={() => openApp("add")}>
        <span className="plus">+</span>
      </button>
    </div>
  );
}



