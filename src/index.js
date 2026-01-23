import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// Register service worker for PWA support and offline functionality
// This improves performance scores and enables offline access
serviceWorker.register();
