import React from "react";
function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
       
        width: "100%",
        height: "80px",    
        background: "#111",
        color:" #fff",
        // justifyContent: "space-between",
        // alignItems: "center",
        padding: "1rem",
        textAlign: "center", 
      }}
    >
      <div>
        <nav style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
                          
              }}>
          <p style={{ margin: "10px" }}>© 2025 All Rights Reserved.</p>
          <p style={{ margin: "10px 40px 0 0" }}>By: Zexin Ziwei Xiaoxue</p>
        </nav>
    
    <p>
      <a href="/privacy" style={{ color: "#ccc", margin: "0 20px 0 0" }}>
        Privacy Policy
      </a>
      <a href="/help" style={{ color: "#ccc", margin: "0 0.5rem 0 0" }}>
        Help
      </a>
    </p>
  </div>
    </footer>
  );
}

export default Footer;
