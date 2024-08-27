import NursingNote from "../Pages/NursingNote/NursingNote";
import Button from "./Button";
import LoginPage from "../Pages/Login/Login";
import VitalSigns from "../Pages/VitalTracking/VitalSigns";
import APIENote from "../Pages/ApieNotes/APIENote";
import UserInformation from "../Pages/UserRegistration/UserInformation";
import { Routes, Route } from "react-router-dom";
import Schedule from "../Pages/Scheduling/Schedule";
import NurseAppointment from "../Pages/NurseAppointment/NurseAppointment";
import DoctorAppointment from "../Pages/DoctorAppointment/DoctorAppointment";
import ClinicalEvaluation from "../Pages/ClinicalEvaluation/ClinicalEvaluation";
import PatientRegistration from "../Pages/PatientRegistration/PatientRegistration";
import AdminDashboard from "../Pages/DashBoard/AdminDashboard";
import DoctorDashboard from "../Pages/DashBoard/DoctorDashboard";
import NurseDashboard from "../Pages/DashBoard/NurseDashboard";
import PatientDetails from "../Pages/PatientDetails/PatientDetails"
import PatientList from "./PatientList"
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/schedule" element={<Schedule />} />
      {/* <Route path='/login-page' element={<LoginPage/>}/> */}
      <Route path="/vital-signs" element={<VitalSigns />} />
      <Route path="/apie-note" element={<APIENote />} />
      <Route path="/user-registration" element={<UserInformation />} />
      <Route path="/nurse-appointment" element={<NurseAppointment />} />
      <Route path="/doctor-appointment" element={<DoctorAppointment />} />
      <Route path="/nursing-note" element={<NursingNote />} />
      <Route path="/initial-evaluation" element={<ClinicalEvaluation />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/nurse-dashboard" element={<NurseDashboard />} />
      <Route path="/patient-details/:mrn" element={<PatientDetails />} />
      <Route path="/patient-list" element={<PatientList />} />

    </Routes>
  );
};

export default Routing;
