import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signUp } from "../../services/authService";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getEmailRegistration, registerEmail } from "../../Services/hr";

import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";

const Registration = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [ userInfo, setUserInfo ] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (params.token) {
      getEmailRegistration(params.token).then((res) => {
        if (res) {
          setUserInfo(res);
          registerEmail(params.token);
        } else {
          console.log('invalid regiser');
        }
      });
    } else {
      console.log('invalid regiser');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      // const response = await signUp(formData);
      const response = await signUp(formData);
      if (response.status === 201) {
        alert('Sign up successful! Please login to continue.');
        navigate('/login'); // Redirect to signin page after signup
      } else if (response.status === 400) {
        alert(`Sign up failed: ${response.data.message}`);
      }
    }
    catch (error) {
      alert(`Sign up failed: ${error}`);
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
        Employee Registration
      </Typography>
      {userInfo && (`for employee: ${userInfo.name}`)}
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
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
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
          Register
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "text.secondary" }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            sx={{ color: "primary.main", textDecoration: "none" }}
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Registration;
