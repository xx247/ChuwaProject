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
        {
          isAuthenticated ? (
            <Route path="/userInfo" element={<UserInfo />} />
            
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
