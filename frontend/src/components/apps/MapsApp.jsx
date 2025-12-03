import React from "react";

export default function MapsApp() {
  return (
    <iframe
      title="Google Maps"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019091696916!2d-122.08424968468118!3d37.42206597982571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5e0cc06d4d7%3A0xcd557a4b1c2cfaf4!2sGoogleplex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "12px"
      }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
