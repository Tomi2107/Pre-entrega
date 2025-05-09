// src/componentes/Toast.jsx
import React from "react";

const Toast = ({ mensaje }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#343a40",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      {mensaje}
    </div>
  );
};

export default Toast;
