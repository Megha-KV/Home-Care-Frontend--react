import React from "react";
import "./NurseDashboard.css";
import { Link } from "react-router-dom";

function NurseDashboard() {
  return (
    <div>
      <section>
        <div className="nurse-dashboard">
          <h1 className="nurse-h1"> NURSE DASHBOARD</h1>
          <div className="nurse-cards">
            <div className="nurse-card">
              <h3 className="nurse-h3">APPOINTMENT LIST</h3>
              <Link to="/nurse-appointment">
                <button className="nurse-btn">view</button>
              </Link>
            </div>
            <div className="nurse-card">
              <h3 className="nurse-h3">VITAL CHECKING</h3>
              <Link to="/vital-signs">
                <button className="nurse-btn">view</button>
              </Link>
            </div>
            <div className="nurse-card">
              <h3 className="nurse-h3">APIE NOTES</h3>
              <Link to="/apie-note">
                <button className="nurse-btn">view</button>
              </Link>
            </div>
            <div className="nurse-card">
              <h3 className="nurse-h3"> NURSING NOTES</h3>
              <Link to="/nursing-note">
                <button className="nurse-btn">view</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NurseDashboard;
