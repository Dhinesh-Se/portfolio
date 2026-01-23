import React, { useContext } from "react";
import { Fade } from "../../components/reveal";
import "./Statistics.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Statistics() {
  const { isDark } = useContext(StyleContext);

  const stats = [
    {
      number: "3+",
      label: "Years Experience",
      icon: "💼"
    },
    {
      number: "10+",
      label: "Projects Delivered",
      icon: "🚀"
    },
    {
      number: "30%",
      label: "Performance Improvement",
      icon: "⚡"
    },
    {
      number: "100%",
      label: "Client Satisfaction",
      icon: "⭐"
    }
  ];

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className={`main statistics-container ${isDark ? "dark-mode" : ""}`} id="statistics">
        <h1 className="statistics-heading">Key Metrics</h1>
        <p className={`statistics-subtitle ${isDark ? "dark-mode" : ""}`}>
          Numbers that showcase my journey and impact
        </p>
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <Fade bottom duration={1000} delay={index * 100} key={index}>
              <div className={`stat-card ${isDark ? "dark-mode" : ""}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </Fade>
  );
}

