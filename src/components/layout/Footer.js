import React from "react";
function Footer() {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "2.5rem",
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <p>© 2025 All Rights Reserved.</p>
      <p> Zexin Ziwei Xiaoyue</p>
      <p>
        <a href="/privacy" style={{ color: "#ccc", margin: "0 0.5rem" }}>
          Privacy Policy
        </a>
        <a href="/help" style={{ color: "#ccc", margin: "0 0.5rem" }}>
          Help
        </a>
      </p>
    </footer>
  );
}

export default Footer;
