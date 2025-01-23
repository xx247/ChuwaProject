import React, { useState } from "react";
import { replace, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../services/authService';
import { login } from '../../redux/slice/authSlice';

import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => { 
    try{
      e.preventDefault();
      const response = await logIn(formData);
      console.log(response);
   
      if (response.status === 200) {
        alert('Log in successful!');

        dispatch(login(response.data.token));// Update Redux state
        //localStorage.setItem('token', response.data.token);
        console.log("redirecting to personal info page");
        navigate('/personalInfo', {replace:true});
      } else if (response.status === 400) {
        alert(`Log in failed: ${response.data.message}`);
      }
    }
    catch (error) {
      alert("Server error. Please try again later.");
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "primary.main" }}>
        Employee Log in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;