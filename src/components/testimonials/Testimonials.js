import React, { useState, useContext } from "react";
import { Fade } from "../reveal";
import "./Testimonials.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Testimonials() {
  const { isDark } = useContext(StyleContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    testimonial: "",
    rating: 5
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Example testimonials - you can fetch from database
  const testimonials = [
    {
      name: "Client/Colleague Name",
      role: "Position",
      company: "Company",
      testimonial: "Add testimonials from clients or colleagues here. This showcases your professional relationships and work quality.",
      rating: 5
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/.netlify/functions/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || "Thank you! Your testimonial has been submitted."
        });
        setFormData({ name: "", role: "", company: "", testimonial: "", rating: 5 });
        setShowForm(false);
      } else {
        setStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to submit testimonial. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className={`main testimonials-container ${isDark ? "dark-mode" : ""}`} id="testimonials">
        <h1 className="testimonials-heading">Testimonials</h1>
        <p className={`testimonials-subtitle ${isDark ? "dark-mode" : ""}`}>
          What people say about working with me
        </p>

        {testimonials.length > 0 && (
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Fade bottom duration={1000} delay={index * 100} key={index}>
                <div className={`testimonial-card ${isDark ? "dark-mode" : ""}`}>
                  <div className="testimonial-rating">
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.testimonial}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role} at {testimonial.company}</span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        )}

        <div className="testimonials-actions">
          <button
            className="submit-testimonial-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Submit a Testimonial"}
          </button>
        </div>

        {showForm && (
          <form className={`testimonial-form ${isDark ? "dark-mode" : ""}`} onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className={isDark ? "dark-mode" : ""}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className={isDark ? "dark-mode" : ""}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={isDark ? "dark-mode" : ""}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Testimonial *"
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows="4"
                required
                className={isDark ? "dark-mode" : ""}
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className={isDark ? "dark-mode" : ""}
              >
                <option value={5}>5 ⭐</option>
                <option value={4}>4 ⭐</option>
                <option value={3}>3 ⭐</option>
                <option value={2}>2 ⭐</option>
                <option value={1}>1 ⭐</option>
              </select>
            </div>
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        )}
      </div>
    </Fade>
  );
}

