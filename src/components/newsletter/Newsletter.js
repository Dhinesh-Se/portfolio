import React, { useState, useContext } from "react";
import "./Newsletter.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Newsletter() {
  const { isDark } = useContext(StyleContext);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/.netlify/functions/subscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || "Successfully subscribed! Check your email for confirmation."
        });
        setEmail("");
      } else {
        setStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`newsletter-section ${isDark ? "dark-mode" : ""}`}>
      <h3>📧 Stay Updated</h3>
      <p>Get notified about new projects, articles, and updates!</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={isDark ? "dark-mode" : ""}
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status.message && (
        <div className={`newsletter-status ${status.type}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}

