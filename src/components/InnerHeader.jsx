import React, { useEffect, useState } from "react";
import "./InnerHeader.css";
import { fetchHeader, fetchPatientDetails } from "../api/InnerHeader";
import { BASE_URL } from "../Global";

function InnerHeader() {
  const [selectedMRN, setSelectedMRN] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const storedMRN = localStorage.getItem("mrn");
    console.log(storedMRN,"haii");
    if (storedMRN) {
      setSelectedMRN(storedMRN);
      fetchPatientData(storedMRN);
    }
  }, []);

  const fetchPatientData = async (mrn) => {
    try {
      const details = await fetchPatientDetails(mrn);
      setPatientDetails(details);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  useEffect(() => {
    console.log(selectedMRN,"selectedMRN");
  }, [selectedMRN])
  

  return (
    <div className="inner-header">
      {patientDetails && (
        <img src={`http://127.0.0.1:8000${patientDetails.photo}`} alt="photo" />
      )}
      <div className="info">
        {patientDetails && (
          <div className="info-1 inline-info">
            <p>MRN: {patientDetails.mr_no}</p>
            <p>CID: {patientDetails.consult_id}</p>
            <p>NAME: {patientDetails.first_name}</p>
            
          </div>
        )}
      </div>
      {patientDetails && (
        <div className="info-2">
          <p>AGE: {patientDetails.age}</p>
          <p>SEX: {patientDetails.sex}</p>
          <p>DOB: {patientDetails.dob}</p>
        </div>
      )}
      {patientDetails && (
        <div className="info-3">
          <p>H/F CONTACT: {patientDetails.contact}</p>
          <p>DOCTOR: {patientDetails.ref_clinician}</p>
          <p>DATE: {patientDetails.date}</p>
        </div>
      )}
      {patientDetails && (
        <div className="info-3">
          <p>LOCATION: {patientDetails.address2} </p>
          <p>ADDRESS: {patientDetails.address1}</p>
          <p>LANDMARK: {patientDetails.city}</p>
        </div>
      )}
    </div>
  );
}

export default InnerHeader;