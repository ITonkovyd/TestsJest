import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App
      autoId={1}
      setModalShow={() => {
        console.log("SetModalShow");
      }}
      topLevel={{
        top: 30,
        expire: "2024-08-20",
      }}
      langId={2}
      salonDateClosed={"2024-09-17"}
      vin={"1234567890ABCDEFG"}
    />
  </React.StrictMode>
);
