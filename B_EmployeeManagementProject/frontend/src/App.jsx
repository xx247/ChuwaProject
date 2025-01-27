import EmployeeProfiles from "./Pages/HR/EmployeeProfiles";
import VisaStatusesManagement from './Pages/HR/VisaStatusesManagement';
import HiringManagement from './Pages/HR/HiringManagement';
import EmployeeProfile from "./Pages/HR/EmployeeProfile";
import OnboardingApplication from "./Pages/HR/OnboardingApplication";
import Navigation from "./Components/HRNavigation";
import Home from "./Pages/HR/Home";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Employee/Registration";
import Login from "./Pages/Employee/Login";
import PersonalInfo from "./Pages/Employee/PersonalInfo";
import SubmitApplication from "./Pages/Employee/SubmitApplication";
import UserInfo from "./Pages/Employee/UserInfo";
import VisaStatus from "./Pages/Employee/VisaStatus";
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  //const isAuthenticated=true;
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;
  console.log("isAuthenticated",isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      {isAuthenticated && (user.role === "Employee" ? <Navbar /> : <Navigation />)}
      <Routes>
        {/* Public Routes */}
        <Route path="/:token?" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visaStatus" element={<VisaStatus/>} />
        <Route path="/hr/employeeProfiles" element={<EmployeeProfiles />} />
        <Route path="/hr/visaStatus" element={<VisaStatusesManagement />} />
        <Route path="/hr/hiringManagement" element={<HiringManagement />} />
        <Route path="/hr/employeeProfile/:id" element={<EmployeeProfile />} />
        <Route path="/hr/onboardingApplication/:id" element={<OnboardingApplication />} />
        <Route path="/hr/" element={<Home />} />
        
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
