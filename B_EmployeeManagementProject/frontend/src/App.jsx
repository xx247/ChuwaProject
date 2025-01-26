// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Pages/Employee/Registration";
import Login from "./Pages/Employee/Login";
import PersonalInfo from "./Pages/Employee/PersonalInfo";
import SubmitApplication from "./Pages/Employee/SubmitApplication";
import UserInfo from "./Pages/Employee/UserInfo";
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  //const isAuthenticated=true;
  const isAuthenticated = useSelector((state) => state.auth.token);


  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/personalInfo"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PersonalInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-application"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SubmitApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userInfo"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
