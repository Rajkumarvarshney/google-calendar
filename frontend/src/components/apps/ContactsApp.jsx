import React, { useState } from "react";
import "../../styles/contacts.css";

export default function ContactsApp() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "" });

  const addContact = () => {
    if (!form.name.trim()) return;
    setContacts([...contacts, { id: Date.now(), ...form }]);
    setForm({ name: "", phone: "" });
  };

  return (
    <div className="contacts-container">
      <h3 className="contacts-title">Contacts</h3>

      <input
        className="contact-input"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="contact-input"
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button className="contact-add-btn" onClick={addContact}>
        Add Contact
      </button>

      <div className="contacts-list">
        {contacts.map((c) => (
          <div key={c.id} className="contact-item">
            <strong>{c.name}</strong>
            <span>{c.phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
