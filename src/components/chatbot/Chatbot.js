import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chatbot.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Chatbot() {
  const { isDark } = useContext(StyleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Dhinesh's AI assistant. Ask me anything about his portfolio, skills, or experience! 😊",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const botResponses = {
    greeting: [
      "Hello! 👋 How can I help you learn more about Dhinesh?",
      "Hi there! What would you like to know?",
      "Hey! Feel free to ask me anything about Dhinesh's work!"
    ],
    skills: [
      "Dhinesh is a Full Stack Software Engineer with expertise in:\n• Java & Spring Boot\n• Angular\n• REST APIs\n• SQL\n• Docker & Kubernetes\n• Frontend: HTML, CSS, JavaScript, TypeScript\n• Backend: Java, Spring Boot\n• Databases: SQL",
      "He specializes in insurance and financial domain applications, with 3+ years of experience building scalable systems."
    ],
    experience: [
      "Dhinesh has 3 years of experience as a Full Stack Developer at KGiSL, working on:\n• Worker Protection Program (WPP)\n• Workers Health Insurance (WHI)\n• Free Zone platforms\n\nHe's delivered enterprise solutions for Dubai Insurance, optimized system performance by 30%, and integrated secure payment gateways.",
      "He successfully delivered the WHI platform in just 30 days, meeting strict government deadlines!"
    ],
    projects: [
      "Major projects include:\n• Worker Protection Program (WPP) - Full stack development\n• Workers Health Insurance (WHI) - Delivered in 30 days\n• Free Zone Platform - Policy and claims management\n\nAll projects involve payment gateway integration and regulatory compliance.",
      "Check out the Projects section to see more details about his work!"
    ],
    contact: [
      "You can reach Dhinesh through:\n• Email: elavarasivel1976@gmail.com\n• LinkedIn: linkedin.com/in/dhineshse\n• GitHub: github.com/Dhinesh-Se\n\nOr use the contact form on this page!",
      "Feel free to send him a message - he's always open to new opportunities! 🚀"
    ],
    education: [
      "Dhinesh graduated with a B.Tech in Information Technology from Coimbatore Institute of Engineering and Technology (2018-2022).",
      "He specialized in Full Stack Development, Database Systems, and Software Engineering during his studies."
    ],
    default: [
      "That's an interesting question! Let me help you with information about Dhinesh's portfolio, skills, experience, projects, or contact details. What would you like to know?",
      "I can tell you about Dhinesh's skills, work experience, projects, education, or how to contact him. What interests you?",
      "Feel free to ask about:\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education\n• How to Contact"
    ]
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    }
    
    if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
      return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
    }
    
    if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("built")) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach") || lowerMessage.includes("hire")) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }
    
    if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("university") || lowerMessage.includes("college")) {
      return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage = getBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botMessage, sender: "bot" }]);
    }, 500);
  };

  return (
    <>
      <button
        className={`chatbot-toggle ${isDark ? "dark-mode" : ""} ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className={`chatbot-container ${isDark ? "dark-mode" : ""}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <h3>Dhinesh's AI Assistant</h3>
                <p>Ask me anything!</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <div className="message-content">
                  {msg.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={isDark ? "dark-mode" : ""}
            />
            <button type="submit" className="chatbot-send">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

