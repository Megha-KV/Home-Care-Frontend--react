import React, { useEffect, useState } from "react";
import "./Vitals.css";
import {  fetchVitalsOfPatient } from "../api/VitalSigns";

function PatientInfo() {
  const [vital, setVital] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMrn, setSelectedMrn] = useState("");

  useEffect(() => {
    async function fetchPatientVitals() {
      try {
        setLoading(true);
        // Retrieve MRN from local storage
        const mrn = localStorage.getItem("mrn");
        console.log(mrn);
        setSelectedMrn(mrn); // Set MRN in state
        // Fetch patient vitals using the MRN from local storage
        const details = await fetchVitalsOfPatient(mrn);
        setVital(details);
        setLoading(false);
      } catch (error) {
        setError("Error fetching patient vitals");
        setLoading(false);
      }
    }
    fetchPatientVitals();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="p-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {vital && (
        <p>
          <strong>Adult</strong>|<strong>H:{vital.height}</strong>|Wt:
          {vital.weight}|<span className="red-1">BMI:{vital.bmi}</span>|
          <span className="red-1">O2 Saturation:{vital.o2_saturation}</span>|
          Head Circum : {vital.head_circum}|Chest Circum :{vital.chest_circum}|
          Waist Cirum:{vital.waist_circum}|Hip Circum:{vital.hip_circum}|
          Abdo.Circum:{vital.abdo_circum}|Temp:{vital.temp_note}|Pulse:
          {vital.pulse_note}|Respiration:{vital.respiration}|Blood pressure:{vital.bp_note}
        </p>
      )}
    </div>
  );
}

export default PatientInfo;