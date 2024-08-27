import React from "react";
import InnerHeader from "./InnerHeader";

const patientData = {
  MRN :6952,
  CID :56626,
  PNR :947,
  NAME : "ABID KAKKAD",
  ARABICNAME : "جون دو",
  DOB_AGE_SEX : "12/02/1965 | 72 YEARS 2 MONTH | MALE",
  "H/F NAME" : "SULAIMAN AHMED",
  "H/F CONTACT" : "09768647839",
  DOCTOR  : "DR KUTTEROFF",
  LOCATION : "309768,647839" ,
  ADDRESS : "ALAIN" ,
  LANDMARK : "POST OFFICE" 

  
};

function PatientInfo() {
  return (
    <div>
      <InnerHeader/>
    </div>
  );
}

export default PatientInfo;