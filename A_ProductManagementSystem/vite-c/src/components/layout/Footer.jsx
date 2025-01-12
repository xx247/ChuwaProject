import React from "react";
function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "60px",    /* or whatever height you like */
        background: "#111",
        color:" #fff",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        textAlign: "center",

        
      }}
    >
      <div>
    <p>© 2025 All Rights Reserved.</p>
    <p>Zexin Ziwei Xiaoyue</p>
    <p>
      <a href="/privacy" style={{ color: "#ccc", margin: "0 0.5rem" }}>
        Privacy Policy
      </a>
      <a href="/help" style={{ color: "#ccc", margin: "0 0.5rem" }}>
        Help
      </a>
    </p>
  </div>
    </footer>
  );
}

export default Footer;
