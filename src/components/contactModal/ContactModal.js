import React, { useContext } from "react";
import "./ContactModal.scss";
import ContactForm from "../contactForm/ContactForm";
import StyleContext from "../../contexts/StyleContext";

export default function ContactModal({ isOpen, onClose }) {
  const { isDark } = useContext(StyleContext);

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div
        className={`contact-modal ${isDark ? "dark-mode" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="contact-modal-header">
          <h2>Get In Touch</h2>
          <p>Send me a message and I'll get back to you soon!</p>
        </div>
        <div className="contact-modal-content">
          <ContactForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}

