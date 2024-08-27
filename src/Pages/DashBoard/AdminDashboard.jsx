import React, { useContext, useEffect } from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
 
  const { user, updateUser } = useContext(UserContext);
  
  return (
    <div>
      {!user ? "loading":
      <section>
        <div className="admin-dashboard">
          <h1 className="admin-h1"> ADMIN DASHBOARD</h1>

          <div className="admin-cards">
            
            <div className="admin-card">
              <h3 className="admin-h3">USER REGISTRATION</h3>
             <Link to="/user-registration "><button className="admin-btn" >view</button></Link> 
            </div>
            <div className="admin-card">
              <h3 className="admin-h3">PATIENT REGISTRATION</h3>
              <Link to="/patient-registration"><button className="admin-btn">view</button></Link>
            </div>
            <div className="admin-card">
              <h3 className="admin-h3">SCHEDULE</h3>
              <Link to="/schedule"><button className="admin-btn">view</button></Link>
            </div>

          </div>
        </div>
      </section>
      }

    </div>
  );
}

export default AdminDashboard;