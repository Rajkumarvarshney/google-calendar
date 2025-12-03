import React, { useState } from "react";
import "../../styles/tasks.css";

export default function TasksApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div className="tasks-container">
      <h3 className="tasks-title">Tasks</h3>

      <input
        className="task-input"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="task-add-btn" onClick={addTask}>
        Add Task
      </button>

      <div className="tasks-list">
        {tasks.map((t) => (
          <div
            key={t.id}
            className={`task-item ${t.done ? "task-done" : ""}`}
            onClick={() => toggleDone(t.id)}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
