import React, {useContext, useState} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import ContactModal from "../../components/contactModal/ContactModal";
import Button from "../../components/button/Button";
import {illustration, contactInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Fade bottom duration={1000} distance="20px">
        <div className="main contact-margin-top" id="contact">
          <div className="contact-div-main">
            <div className="contact-header">
              <h1 className="heading contact-title">{contactInfo.title}</h1>
              <p
                className={
                  isDark
                    ? "dark-mode contact-subtitle"
                    : "subTitle contact-subtitle"
                }
              >
                {contactInfo.subtitle}
              </p>
              <div
                className={
                  isDark ? "dark-mode contact-text-div" : "contact-text-div"
                }
              >
                {contactInfo.number && (
                  <>
                    <a
                      className="contact-detail"
                      href={"tel:" + contactInfo.number}
                    >
                      {contactInfo.number}
                    </a>
                    <br />
                    <br />
                  </>
                )}
                <a
                  className="contact-detail-email"
                  href={"mailto:" + contactInfo.email_address}
                >
                  {contactInfo.email_address}
                </a>
                <br />
                <br />
                <SocialMedia />
                <div className="contact-form-button">
                  <Button
                    text="Send Message"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
            </div>
            <div className="contact-image-div">
              {illustration.animated ? (
                <DisplayLottie animationData={email} />
              ) : (
                <img
                  alt="Man working"
                  src={require("../../assets/images/contactMailDark.svg")}
                ></img>
              )}
            </div>
          </div>
        </div>
      </Fade>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
