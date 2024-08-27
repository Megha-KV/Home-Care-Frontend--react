import React from "react";
import "./DoctorDashboard.css";
import { Link } from "react-router-dom";

function DoctorDashboard() {
  return (
    <div>
      <section>
        <div className="doctor-dashboard">
          <h1 className="doctor-h1"> DOCTOR DASHBOARD</h1>
          <div className="doctor-cards">
            <div className="doctor-card">
              <h3 className="doctor-h3">APPOINTMENT LIST</h3>
              <Link to="/doctor-appointment"><button className="doctor-btn">view</button></Link>
            </div>

            <div className="doctor-card">
              <h3 className="doctor-h3"> INITIAL EVALUATION</h3>
              <Link to="/initial-evaluation"><button className="doctor-btn">view</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DoctorDashboard;
