// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Employee/Registration";
import Login from "./pages/Employee/Login";
import PersonalInfo from "./pages/Employee/PersonalInfo";
import SubmitApplication from "./pages/Employee/SubmitApplication";
import UserInfo from "./pages/Employee/UserInfo";
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';

const App = () => {
  //const isAuthenticated=true;
  //const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = useSelector((state) => state.auth.token);


  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userInfo" element={<UserInfo />} />
        {
          isAuthenticated ? (
            <Route path="/personalInfo" element={<PersonalInfo />} />
            
          ) : (
            <Route path="/personalInfo" element={<Navigate to="/" />} />
          )
        }
        {
          isAuthenticated ? (
            <Route path="/submit-application" element={< SubmitApplication/>} />            
          ) : (
            <Route path="/personalInfo" element={<Navigate to="/" />} />
          )
        }
        {/* <Route path="/personalInfo" element={isAuthenticated ? <PersonalInfo /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
