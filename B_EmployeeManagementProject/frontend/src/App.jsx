// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Employee/Registration";
import Login from "./pages/Employee/Login";
import PersonalInfo from "./pages/Employee/PersonalInfo";
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';

const App = () => {
  //const isAuthenticated=true;
  //const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = useSelector((state) => state.auth.token);
  // 记得换成用redux才能全局更新
  // 否则如果在其他页面登出会导致这个页面的isAuthenticated不更新

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
            <Route path="/personalInfo" element={<Navigate to="/login" />} />
          )
        }
        {/* <Route path="/personalInfo" element={isAuthenticated ? <PersonalInfo /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
