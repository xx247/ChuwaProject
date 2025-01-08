import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        textAlign: "center",
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
