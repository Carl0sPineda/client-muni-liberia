import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ContextProvider from "./context/ContextProvider.jsx";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "aos/dist/aos.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
