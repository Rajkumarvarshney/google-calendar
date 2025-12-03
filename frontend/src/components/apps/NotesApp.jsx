import React, { useState } from "react";
import "../../styles/notes.css";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([...notes, { id: Date.now(), text }]);
    setText("");
  };

  return (
    <div className="notes-container">
      <h3 className="notes-title">Notes</h3>

      <textarea
        className="notes-input"
        placeholder="Take a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="notes-add-btn" onClick={addNote}>Add Note</button>

      <div className="notes-list">
        {notes.map((n) => (
          <div key={n.id} className="note-item">
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
}
