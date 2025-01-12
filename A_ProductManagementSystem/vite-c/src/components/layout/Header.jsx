import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "../../pages/cart";
const Header = () => {
  // const { carts } = useSelector((state) => state.allCart);
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
        <Link to="/ProductList" style={{ color: "#fff" }}>
          Products
        </Link>
        {/* <Link to="/cart" style={{ marginLeft: "1rem", color: "#fff" }}>
          cart
        </Link> */}
        <button
          onClick={handleCartToggle}
          style={{
            background: "#666",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
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