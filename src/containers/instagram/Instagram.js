import React, {useContext, useEffect} from "react";
import "./Instagram.scss";
import {instagramDetails} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import {Fade} from "react-reveal";

export default function Instagram() {
  const {isDark} = useContext(StyleContext);

  // Load Instagram embed script
  useEffect(() => {
    if (instagramDetails.display && instagramDetails.userName) {
      const loadInstagramScript = () => {
        if (!window.instgrm) {
          const script = document.createElement("script");
          script.src = "https://www.instagram.com/embed.js";
          script.async = true;
          script.onload = () => {
            if (window.instgrm && window.instgrm.Embeds) {
              window.instgrm.Embeds.process();
            }
          };
          document.body.appendChild(script);
        } else if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      };
      setTimeout(loadInstagramScript, 100);
    }
  }, []);

  if (!instagramDetails.display) {
    return null;
  }

  if (!instagramDetails.userName) {
    return null;
  }

  // Get post URLs from portfolio config
  const postUrls = instagramDetails.postUrls || [];

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="instagram-main-div" id="instagram">
        <div className="instagram-header">
          <h1 className={isDark ? "dark-mode instagram-heading" : "instagram-heading"}>
            Instagram
          </h1>
          <p
            className={
              isDark
                ? "dark-mode instagram-subtitle"
                : "subTitle instagram-subtitle"
            }
          >
            Follow me on Instagram for updates and behind-the-scenes content
          </p>
        </div>
        
        <div className="instagram-content">
          {postUrls.length > 0 ? (
            <div className="instagram-grid">
              {postUrls.map((postUrl, index) => (
                <div key={index} className="instagram-post-card">
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-post-link"
                  >
                    <div className="instagram-embed-container">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-captioned
                        data-instgrm-permalink={postUrl}
                        data-instgrm-version="14"
                      >
                      </blockquote>
                    </div>
                    <div className="instagram-post-overlay">
                      <div className="instagram-post-icon">
                        <i className="fab fa-instagram"></i>
                      </div>
                      <span className="instagram-view-text">View on Instagram</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="instagram-placeholder">
              <div className="instagram-profile-link">
                <a
                  href={`https://www.instagram.com/${instagramDetails.userName}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isDark ? "dark-mode instagram-button" : "instagram-button"}
                >
                  <i className="fab fa-instagram"></i>
                  <span>View My Instagram Profile</span>
                </a>
              </div>
              <div className="instagram-instructions">
                <h3>How to Add Instagram Posts:</h3>
                <ol className={isDark ? "dark-mode" : ""}>
                  <li>Go to your Instagram profile: <code>instagram.com/{instagramDetails.userName}</code></li>
                  <li>Click on any post you want to display</li>
                  <li>Copy the URL from the address bar</li>
                  <li>Open <code>src/portfolio.js</code></li>
                  <li>Find <code>instagramDetails</code> and add URLs to <code>postUrls</code> array</li>
                  <li>Format: <code>"https://www.instagram.com/p/POST_ID/"</code></li>
                </ol>
                <p className={isDark ? "dark-mode instagram-note" : "instagram-note"}>
                  Example: Add 6-12 post URLs to show your latest posts automatically!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}

