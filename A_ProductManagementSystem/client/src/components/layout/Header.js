import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2>Management Chuwa</h2>
        </Link>
      </div>
      <nav>
        <Link to="/signin" style={{ marginRight: "1rem", color: "#fff" }}>
          Sign In
        </Link>
        <Link to="/products" style={{ color: "#fff" }}>
          Products
        </Link>
      </nav>
    </header>
  );
}

export default Header;
