import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "../../pages/cart";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header
      style={{
        background: "#111",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",

      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2>Management Chuwa</h2>
        </Link>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem" 
        }}
      >
        <Link to="/signin" style={{ color: "#fff", textDecoration: "none" ,whiteSpace: "nowrap"}}>
          Sign In
        </Link>

        <button
          onClick={handleCartToggle}
          style={{
            background: "#666",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cart
        </button>
        <Cart isOpen={isCartOpen} />
      </nav>
    </header>
  );
};

export default Header;