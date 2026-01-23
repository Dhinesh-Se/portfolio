import React, {useContext} from "react";
import {Fade} from "../../components/reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import TypingAnimation from "../../components/typingAnimation/TypingAnimation";
import {illustration, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {greeting.typingStrings ? (
                  // If typingStrings is configured, use typing animation
                  <>
                    {greeting.titlePrefix || "Hi all, I'm"}{" "}
                    <TypingAnimation 
                      strings={greeting.typingStrings}
                      typeSpeed={greeting.typingSpeed || 100}
                      backSpeed={greeting.typingBackSpeed || 50}
                      loop={greeting.typingLoop !== undefined ? greeting.typingLoop : true}
                    />
                    {" "}
                  </>
                ) : (
                  // Otherwise, use the static title from configuration
                  greeting.title
                )}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink ? (
                  <Button 
                    text="Download my resume" 
                    href={greeting.resumeLink}
                    newTab={true}
                    className="download-link-button"
                  />
                ) : (
                  <a
                    href={require("./dhinesh_se_resume.pdf")}
                    download="dhinesh_se_resume.pdf"
                    className="download-link-button"
                    onClick={async () => {
                      // Track download
                      try {
                        await fetch("/.netlify/functions/track-download", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ source: "greeting-section" })
                        });
                      } catch (error) {
                        console.error("Failed to track download:", error);
                      }
                    }}
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    <div className="main-button" style={{ cursor: "pointer" }}>
                      Download my resume
                    </div>
                  </a>
                )}
              </div>

            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
