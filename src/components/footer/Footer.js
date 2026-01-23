import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "../reveal";
import emoji from "react-easy-emoji";
import Newsletter from "../newsletter/Newsletter";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <>
      <Newsletter />
      <Fade bottom duration={1000} distance="5px">
        <div className="footer-div">
          <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
            {emoji("Made with ❤️ by VD")}
          </p>
        </div>
      </Fade>
    </>
  );
}
