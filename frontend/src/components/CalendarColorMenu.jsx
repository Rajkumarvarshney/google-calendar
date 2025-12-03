import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../styles/colorMenu.css";
import { FiCheck } from "react-icons/fi";

export default function CalendarColorMenu({
  position,
  selectedColor,
  setColor,
  onClose,
}) {
  const ref = useRef();

  // Close if clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const colors = [
    "#d50000", "#e67c73", "#f4511e", "#f6bf26",
    "#33b679", "#0b8043", "#039be5", "#3f51b5",
    "#7986cb", "#8e24aa", "#616161",
    "#43a047", "#c0ca33", "#ff7043",
  ];

  // 🚀 RENDER MENU INTO BODY (so it is ABOVE EVERYTHING)
  return createPortal(
    <div
      ref={ref}
      className="color-menu"
      style={{
        top: position.y,
        left: position.x,
        position: "fixed",
        zIndex: 9999999,
      }}
    >
      {/* Menu top */}
      <div className="menu-section top-options">
        <div className="menu-option">Display this only</div>
        <div className="menu-option">Settings and sharing</div>
      </div>

      {/* Color grid */}
      <div className="menu-section color-grid">
        {colors.map((color) => (
          <div
            key={color}
            className="color-dot"
            style={{ backgroundColor: color }}
            onClick={(e) => {
              e.stopPropagation();
              setColor(color);
              onClose();
            }}
          >
            {selectedColor === color && <FiCheck className="color-check" />}
          </div>
        ))}

        <div className="color-dot add-color">
          <span className="plus">+</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
