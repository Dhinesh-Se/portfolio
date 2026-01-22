import React from "react";
import "./Button.scss";

export default function Button({text, className, href, newTab, type, disabled, onClick}) {
  if (type === "submit" || onClick) {
    return (
      <div className={className}>
        <button 
          className="main-button" 
          type={type || "button"}
          disabled={disabled}
          onClick={onClick}
          style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }}
        >
          {text}
        </button>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <a className="main-button" href={href} target={newTab && "_blank"}>
        {text}
      </a>
    </div>
  );
}
