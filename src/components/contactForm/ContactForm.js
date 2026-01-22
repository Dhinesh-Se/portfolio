import React, { useState, useContext } from "react";
import "./ContactForm.scss";
import Button from "../button/Button";
import StyleContext from "../../contexts/StyleContext";

export default function ContactForm({ onSuccess }) {
  const { isDark } = useContext(StyleContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Netlify Forms submission
    const formDataToSubmit = new FormData(e.target);
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataToSubmit).toString()
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I'll get back to you soon!"
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Close modal after success
        if (onSuccess) {
          setTimeout(() => onSuccess(), 2000);
        }
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again or email me directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      className={`contact-form ${isDark ? "dark-mode" : ""}`} 
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={handleChange}
          required
          className={isDark ? "dark-mode" : ""}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={handleChange}
          required
          className={isDark ? "dark-mode" : ""}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject *"
          value={formData.subject}
          onChange={handleChange}
          required
          className={isDark ? "dark-mode" : ""}
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          required
          className={isDark ? "dark-mode" : ""}
        />
      </div>
      {status.message && (
        <div className={`form-status ${status.type}`}>
          {status.message}
        </div>
      )}
      <div className="form-submit">
        <Button
          text={isSubmitting ? "Sending..." : "Send Message"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}

