import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logout } from '../../redux/authSlice';
import Cart from "../../pages/Cart";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptycartIteam } from '../../redux//slices/cartSlice';
const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
        dispatch(logout()); // Clear token from Redux and localStorage
           dispatch(emptycartIteam());//clear cart

        navigate('/signin'); // Redirect to the Sign In page
  };

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
        height: "76px"
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none"}}>
          <h2 style={{ fontsize: "48px"}}>Management Chuwa</h2>
        </Link>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem" 
        }}
      >
        {location.pathname === "/ProductList" ? (
          <p onClick={handleLogout} style={{ color: "#fff", textDecoration: "none" ,whiteSpace: "nowrap"}}>
            Logout
          </p>
        ) : (
          <Link to="/signin" style={{ color: "#fff", textDecoration: "none" ,whiteSpace: "nowrap"}}>
            Sign In
          </Link>
        )}
       

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
