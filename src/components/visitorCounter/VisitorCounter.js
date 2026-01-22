import React, { useState, useEffect, useContext } from "react";
import "./VisitorCounter.scss";
import StyleContext from "../../contexts/StyleContext";

export default function VisitorCounter() {
  const { isDark } = useContext(StyleContext);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track current visit
    const trackVisit = async () => {
      try {
        await fetch("/.netlify/functions/track-visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || "direct"
          }),
        });
      } catch (error) {
        console.error("Failed to track visitor:", error);
      }
    };

    // Get stats
    const getStats = async () => {
      try {
        const response = await fetch("/.netlify/functions/get-stats");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const result = await response.json();
        
        if (result.success && result.stats) {
          setCount(result.stats.totalVisitors || 0);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Set count to null to show "—" when stats can't be loaded
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
    getStats();
  }, []);

  if (isLoading) {
    return (
      <div className={`visitor-counter ${isDark ? "dark-mode" : ""}`}>
        <span className="counter-label">Visitors:</span>
        <span className="counter-value">...</span>
      </div>
    );
  }

  return (
    <div className={`visitor-counter ${isDark ? "dark-mode" : ""}`}>
      <span className="counter-label">👥 Visitors:</span>
      <span className="counter-value">{count !== null ? count.toLocaleString() : "—"}</span>
    </div>
  );
}

