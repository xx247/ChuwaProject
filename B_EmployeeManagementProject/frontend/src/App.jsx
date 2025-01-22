import { Routes, Route } from "react-router-dom";
import EmployeeProfiles from "./Pages/HR/EmployeeProfiles";
import VisaStatusesManagement from './Pages/HR/VisaStatusesManagement';
import HiringManagement from './Pages/HR/HiringManagement';
import EmployeeProfile from "./Pages/HR/EmployeeProfile";
import OnboardingApplication from "./Pages/HR/OnboardingApplication";

import './App.css'

function App() {
  return (
    <>
      <main id="root">
        <Routes>
          <Route path="/hr/employeeProfiles" element={<EmployeeProfiles />} />
          <Route path="/hr/visaStatus" element={<VisaStatusesManagement />} />
          <Route path="/hr/hiringManagement" element={<HiringManagement />} />
          <Route path="/hr/employeeProfile/:id" element={<EmployeeProfile />} />
          <Route path="/hr/onboardingApplication/:id" element={<OnboardingApplication />} />
        </Routes>
      </main>
    </>
  )
}

export default App
