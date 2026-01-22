import React, { useState, useEffect } from "react";
import "./TypingAnimation.scss";

export default function TypingAnimation({ 
  strings, 
  typeSpeed = 100, 
  backSpeed = 50, 
  loop = true 
}) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const current = strings[currentStringIndex];
    let timeout;

    if (!isDeleting && currentText === current) {
      // Finished typing, wait then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(backSpeed);
      }, 2000);
    } else if (isDeleting && currentText === "") {
      // Finished deleting, move to next string
      setIsDeleting(false);
      setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      setTypingSpeed(typeSpeed);
    } else {
      // Typing or deleting
      timeout = setTimeout(() => {
        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, backSpeed, typingSpeed]);

  return (
    <span className="typing-animation">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
}

