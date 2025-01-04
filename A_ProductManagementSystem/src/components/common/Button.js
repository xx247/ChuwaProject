import React from "react";

function Button({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#6c63ff",
        color: "#fff",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
