// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/authSlice';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user ? user.role : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear token from Redux and localStorage
    navigate('/'); // Redirect to the Sign In page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        {
          role === 'Employee' ? (
            <>
            <Button color="inherit" onClick={() => navigate("/personalInfo")}>
              Personal Information
            </Button>
            <Button color="inherit" onClick={() => navigate("/visa-status")}>
              Visa Status Management
            </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              HR Dashboard
            </Button>
          )
        }
        {
          user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )
        }
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
