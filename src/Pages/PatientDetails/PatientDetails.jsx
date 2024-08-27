import React, { useState } from "react";
import "../PatientRegistration/PatientRegistration.css";
 import AdminHeader from "../../components/Header/AdminHeader.jsx";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { getSinglePatient, updatePatient} from "../../api/PatientDetails.js";
import { useParams } from "react-router-dom";
import { deletePatient } from "../../api/PatientDetails.js";

function PatientRegistration() {
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState(null);
  const {mrn} = useParams()
  
  const [updatedPatient , setUpdatedPatient] = useState({mr_no:mrn});
  
  const handleDataChange = (field, value) => {
    setUpdatedPatient((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const data = await getSinglePatient(mrn);
      console.log(data, " single patient data");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
    
  }, [])

  const navigate = useNavigate()
  

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSave = async () => {
    console.log("patient data:", data);
    try {
      const responseData = await updatePatient(updatedPatient);
      console.log("POST Response:", responseData);
      navigate('/schedule')
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  useEffect(() => {
    console.log(updatedPatient);
  }, [updatedPatient])
  

  // Function to handle delete action
  const handleDelete = async () => {
    console.log("patient data:", data);
    try {
      await deletePatient({ mr_no: data.mr_no });
      // Assuming successful deletion, redirect to some other page or display a success message
      navigate("/patient-list"); // Example redirection to a success page
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="patient-reg-container">
      <AdminHeader />
      <h2>Patient Registration</h2>
{/* --------------------Patient Registration-------------------------- */}
      <div class="pr-form-container">
        <div class="inputs-row">
          <label for="file-no" className="pr-labels">
            File No , Clinician
          </label>
          <input
            className="pr-input"
            type="text"
            id="file-no"
            name="file-no"
            onChange={(e) => handleDataChange("File_no", e.target.value)}
            value={(updatedPatient.File_no || updatedPatient.File_no=='') ? updatedPatient.File_no : data.File_no}
          />
          <input
            className="pr-input"
            type="text"
            id="clinician"
            name="clinician"
            onChange={(e) => handleDataChange("clinician", e.target.value)}
            value={(updatedPatient.clinician || updatedPatient.clinician=='') ? updatedPatient.clinician : data.clinician}
          />
        </div>
        <div class="inputs-row">
          <label for="mrn-cid" className="pr-labels">
            MRN, CID
          </label>
          <input
            className="pr-input"
            type="text"
            id="pr-mrn"
            name="mrn"
            onChange={(e) => handleDataChange("mr_no", e.target.value)}
            value={(updatedPatient.mr_no || updatedPatient.mr_no=='') ? updatedPatient.mr_no : data.mr_no}
          />
          <input
            className="pr-input"
            type="text"
            id="pr-cid"
            name="cid"
            onChange={(e) => handleDataChange("consult_id", e.target.value)}
            value={(updatedPatient.consult_id || updatedPatient.consult_id=='') ? updatedPatient.consult_id : data.consult_id}
          />
        </div>
        <div class="inputs-row">
          <label for="ord-clinician" className="pr-labels">
            Ord Clinician , Dept
          </label>
          <input
            className="pr-input"
            type="text"
            id="ord-clinician"
            name="ord-clinician"
            onChange={(e) => handleDataChange("ord_clinician", e.target.value)}
            value={(updatedPatient.ord_clinician || updatedPatient.ord_clinician=='') ? updatedPatient.ord_clinician : data.ord_clinician}
          />
          <select
            className="pr-select"
            id="dept"
            name="dept"
            onChange={(e) => handleDataChange("dept", e.target.value)}
            value={(updatedPatient.dept || updatedPatient.dept=='') ? updatedPatient.dept : data.dept}
          >
            <option value=""></option>
            <option value="department1">Emergency Department (ER)</option>
            <option value="department2">Pediatrics</option>
            <option value="department3">Obstetrics and Gynecology (OB/GYN)</option>
            <option value="department4">Surgery</option>
            <option value="department5">Internal Medicine</option>
            <option value="department6">Cardiology</option>
            <option value="department7">Oncology</option>
            <option value="department8">Neurology</option>
            <option value="department9">Orthopedics</option>
            <option value="department10">Radiology</option>
            <option value="department11">Psychiatry</option>
            <option value="department12">Dermatology</option>
            <option value="department7">Ophthalmology</option>
            <option value="department8">Anesthesiology</option>
            <option value="department11">Pulmonology</option>
            <option value="department9">Urology</option>
            <option value="department10">Nephrology</option>
            <option value="department11">Physical Therapy</option>
            <option value="department11">Occupational Therapy</option>
            <option value="department12">Speech Therapy</option>
            <option value="department7">Intensive Care Unit (ICU)</option>
            <option value="department8">Coronary Care Unit (CCU)</option>
            <option value="department9">Neonatal Intensive Care Unit (NICU)</option>
          </select>
        </div>
        <div class="inputs-row">
          <label for="ref-clinic" className="pr-labels">
            Ref Clinic, Status
          </label>
          <input
            className="pr-input"
            type="text"
            id="ref-clinic"
            name="ref-clinic"
            onChange={(e) => handleDataChange("ref_clinician", e.target.value)}
            value={(updatedPatient.ref_clinician || updatedPatient.ref_clinician=='') ? updatedPatient.ref_clinician : data.ref_clinician}
          />
          <input
            className="pr-input"
            type="text"
            id="status"
            name="status"
            onChange={(e) => handleDataChange("status", e.target.value)}
            value={(updatedPatient.status || updatedPatient.status=='') ? updatedPatient.status : data.status}
          />
        </div>
        <div class="inputs-row">
          <label for="diag-clinic" className="pr-labels">
            Diag.Clinic, Diag.Clinician
          </label>
          <select
            className="pr-select"
            id="diag-clinic"
            name="diag-clinic"
            onChange={(e) => handleDataChange("diag_clinic", e.target.value)}
            value={(updatedPatient.diag_clinic || updatedPatient.diag_clinic=='') ? updatedPatient.diag_clinic : data.diag_clinic}
          >
            <option value=""></option>
            <option value="clinic1">Clinic 1</option>
            <option value="clinic2">Clinic 2</option>
          </select>
          <select
            className="pr-select"
            id="diag-clinician"
            name="diag-clinician"
            onChange={(e) => handleDataChange("diag_clinician", e.target.value)}
            value={(updatedPatient.diag_clinician || updatedPatient.diag_clinician=='') ? updatedPatient.diag_clinician : data.diag_clinician}
          >
            <option value=""></option>
            <option value="clinician1">Clinician 1</option>
            <option value="clinician2">Clinician 2</option>
          </select>
        </div>
        <div class="inputs-row">
          <label for="date-time" className="pr-labels">
            Date&Time
          </label>
          <input
            className="pr-input"
            type="date"
            id="pr-date"
            name="date"
            onChange={(e) => handleDataChange("date", e.target.value)}
            value={(updatedPatient.date || updatedPatient.date=='') ? updatedPatient.date : data.date}
          />
          <input
            className="pr-input"
            type="time"
            id="pr-time"
            name="time"
            onChange={(e) => handleDataChange("time", e.target.value)}
            value={(updatedPatient.time || updatedPatient.time=='') ? updatedPatient.time : data.time}
          />
        </div>
      </div>
{/* ------------------------------patient info-------------------------- */}
      <div class="patient-information">
        <h2>Patient Information </h2>
        <hr />
        <div class="pi-row">
          <label for="name" class="pi-labels">
            Name
          </label>
          <select
            className="id-select"
            id="title"
            name="title"
            onChange={(e) => handleDataChange("title", e.target.value)}
            value={(updatedPatient.title || updatedPatient.title=='') ? updatedPatient.title : data.title}
          >
            <option value="">Title</option>
            <option value="mr">Mr.</option>
            <option value="mrs">Mrs.</option>
            <option value="ms">Ms.</option>
            <option value="dr">Dr.</option>
          </select>
          <input
            className="firstname-input"
            type="text"
            id="name"
            name="name"
            placeholder="First Name"
            onChange={(e) => handleDataChange("first_name", e.target.value)}
            value={(updatedPatient.first_name || updatedPatient.first_name=='') ? updatedPatient.first_name : data.first_name}
          />
          <input
            className="middlename-input"
            type="text"
            id="middle-name"
            name="middle-name"
            placeholder="Middle Name"
            onChange={(e) => handleDataChange("middle_name", e.target.value)}
            value={(updatedPatient.middle_name || updatedPatient.middle_name=='') ? updatedPatient.middle_name : data.middle_name}
          />
          <input
            className="lastname-input"
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Last Name"
            onChange={(e) => handleDataChange("last_name", e.target.value)}
            value={(updatedPatient.last_name || updatedPatient.last_name=='') ? updatedPatient.last_name: data.last_name }
          />
        </div>
        <div class="pi-row">
          <label for="dob" class="pi-labels">
            DOB / Age / Sex
          </label>
          <input
            className="pr-date"
            type="date"
            id="dob"
            name="dob"
            onChange={(e) => handleDataChange("dob", e.target.value)}
            value={ (updatedPatient.dob || updatedPatient.dob=='') ? updatedPatient.dob : data.dob }
          />
          <input
            className="pr-input"
            type="text"
            id="age"
            name="age"
            onChange={(e) => handleDataChange("age", e.target.value)}
            value={(updatedPatient.age || updatedPatient.age=='') ? updatedPatient.age : data.age}
          />
          <select
            className="pr-select"
            id="sex"
            name="sex"
            onChange={(e) => handleDataChange("sex", e.target.value)}
            value={(updatedPatient.sex || updatedPatient.sex=='') ? updatedPatient.sex :data.sex}
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="pi-row">
          <label for="marital-status" class="pi-labels">
            Marital Status, Religion
          </label>
          <select
            className="pr-select"
            id="marital-status"
            name="marital-status"
            onChange={(e) => handleDataChange("marital_status", e.target.value)}
            value={(updatedPatient.marital_status || updatedPatient.marital_status=='') ? updatedPatient.marital_status : data.marital_status}
          >
            <option value=""></option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="widowed">Widowed</option>
            <option value="divorced">Divorced</option>
          </select>

          <select
            className="pr-select"
            id="religion"
            name="religion"
            onChange={(e) => handleDataChange("religion", e.target.value)}
            value={(updatedPatient.religion || updatedPatient.religion=='') ? updatedPatient.religion : data.religion}
          >
            <option value=""></option>
            <option value="islam">Islam</option>
            <option value="christianity">Christianity</option>
            <option value="hinduism">Hinduism</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="pi-row">
          <label for="nation" class="pi-labels">
            Nationality, Passport ID
          </label>
          <select
            className="pr-select"
            id="national"
            name="nationality"
            onChange={(e) => handleDataChange("nationality", e.target.value)}
            value={(updatedPatient.nationality || updatedPatient.nationality=='') ? updatedPatient.nationality : data.nationality}
          >
            <option value=""></option>
            <option value="uae">Emirati (UAE nationals)</option>
            <option value="indian">Indian</option>
            <option value="bangladeshi">Bangladeshi</option>
            <option value="pakistani">Pakistani</option>
            <option value="egyptian">Egyptian</option>
            <option value="jordanian">Jordanian</option>
            <option value="pakistan">Syrian</option>
            <option value="pakistan">Lebanese</option>
            <option value="sudanese">Sudanese</option>
          </select>
          <input
            className="pr-input"
            type="text"
            id="pass"
            name="passport"
            onChange={(e) => handleDataChange("passport_id", e.target.value)}
            value={(updatedPatient.passport_id || updatedPatient.passport_id=='') ? updatedPatient.passport_id : data.passport_id}
          />
        </div>

        <div class="pi-row">
          <label for="emirates-id" class="pi-labels">
            Emirates ID,Unified Number
          </label>
          <input
            className="pr-input"
            type="text"
            id="emirates-id"
            name="emirates-id"
            onChange={(e) => handleDataChange("emirated_id", e.target.value)}
            value={(updatedPatient.emirated_id || updatedPatient.emirated_id=='') ? updatedPatient.emirated_id : data.emirated_id}
          />
          <input
            className="pr-input"
            type="text"
            id="unified-number"
            name="unified-number"
            onChange={(e) => handleDataChange("unified", e.target.value)}
            value={(updatedPatient.unified || updatedPatient.unified=='') ? updatedPatient.unified : data.unified}
          />
        </div>
        {/* <label className="pi-photo" htmlFor="photo">Upload Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
  />*/}
      </div>

      <div>
        <h2>Next of KIN</h2>
        <hr />
        <div className="kin-input-row">
          <label className="kin-label">Full Name</label>
          <input
            className="kin-input"
            type="text"
            id="full-name"
            name="full-name"
            onChange={(e) => handleDataChange("full_name", e.target.value)}
            value={(updatedPatient.full_name || updatedPatient.full_name=='') ? updatedPatient.full_name : data.full_name}
          />
          <label className="kin-label">Relationship</label>
          <select
            className="kin-select"
            id="relationship"
            name="relationship"
            onChange={(e) => handleDataChange("relationship", e.target.value)}
            value={(updatedPatient.relationship || updatedPatient.relationship=='') ? updatedPatient.relationship : data.relationship}
          >
            <option value=""></option>
            <option value="spouse">Spouse</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="son">Son</option>
            <option value="daughter">Daughter</option>
            {/* Add more options as needed */}
          </select>
          <label className="kin-label">Contact No</label>
          <input
            className="kin-input"
            type="text"
            id="kin-contact-no"
            name="kin-contact-no"
            onChange={(e) => handleDataChange("contact_no", e.target.value)}
            value={(updatedPatient.contact_no || updatedPatient.contact_no=='') ? updatedPatient.contact_no : data.contact_no}
          />
        </div>
      </div>
{/* ------------------------------contactdetails ----------------------------- */}
      <div>
        <h2>Contact Details</h2>
        <hr />
        <div class="contact-details">
          <div class="address-row">
            <label for="address-type" className="kin-label">
              Address
            </label>
            <select
              className="kin-select"
              id="address-type"
              name="address-type"
              placeholder="Home"
              onChange={(e) => handleDataChange("address", e.target.value)}
              value={(updatedPatient.address || updatedPatient.address=='') ? updatedPatient.address : data.address}
            >
              <option value=""></option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="others">Others</option>
            </select>
            <input
              className="kin-input"
              type="text"
              id="address1"
              name="address1"
              placeholder="Address 1"
              onChange={(e) => handleDataChange("address1", e.target.value)}
              value={(updatedPatient.address1 || updatedPatient.address1=='') ? updatedPatient.address1 : data.address1}
            />
            <input
              className="kin-input"
              type="text"
              id="address2"
              name="address2"
              placeholder=" Address 2"
              onChange={(e) => handleDataChange("address2", e.target.value)}
              value={(updatedPatient.address2 || updatedPatient.address2=='') ? updatedPatient.address2 : data.address2}
            />
          </div>

          <div class="residence-row">
            <label for="residence" className="kin-label">
              Res. of Emirates, City
            </label>
            <select
              className="kin-select"
              id="residence"
              name="residence"
              onChange={(e) =>
                handleDataChange("resi_of_emirates", e.target.value)
              }
              value={(updatedPatient.resi_of_emirates || updatedPatient.resi_of_emirates=='') ? updatedPatient.resi_of_emirates : data.resi_of_emirates}
            >
              <option value=""></option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <input
              className="kin-input"
              type="text"
              id="city"
              name="city"
              onChange={(e) => handleDataChange("city", e.target.value)}
              value={(updatedPatient.city || updatedPatient.city=='') ? updatedPatient.city : data.city}
            />
          </div>

          <div class="contact-row">
            <label for="contact-no" className="kin-label">
              Contact No,  Work No
            </label>
            <input
              className="kin-input"
              type="tel"
              id="contact-no"
              name="contact-no"
              onChange={(e) => handleDataChange("contact", e.target.value)}
              value={(updatedPatient.last_name || updatedPatient.last_name=='') ? updatedPatient.contact : data.contact}
            />
            <input
              className="kin-input"
              type="tel"
              id="work-no"
              name="work-no"
              onChange={(e) => handleDataChange("work_no", e.target.value)}
              value={(updatedPatient.work_no || updatedPatient.work_no=='') ? updatedPatient.work_no : data.work_no}
            />
            
          </div>
          <div class="email-row">
              <label for="email" className="kin-label">
                Email
              </label>
              <input
                className="kin-input"
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleDataChange("email", e.target.value)}
                value={(updatedPatient.email || updatedPatient.email=='') ? updatedPatient.email : data.email}
              />
            </div>
        </div>
      </div>
{/* -----------------------insurance-------------------------------------- */}
      <div className="insurance-details">
        <h2>Insurance Details</h2>
        <hr />
        <div className="insurance-form-container">
          <div className="insurance-sub">
            <label htmlFor="insurance-company" className="insurance-label">
              Company,Plan
            </label>
            <select
              id="insurance-company"
              name="insurance-company"
              onChange={(e) => handleDataChange("company", e.target.value)}
              value={(updatedPatient.company || updatedPatient.company=='') ? updatedPatient.company : data.company}
            >
              <option value=""></option>
              <option value="company1">Company 1</option>
              <option value="company2">Company 2</option>
              <option value="company3">Company 3</option>
              <option value="company4">Company 4</option>
              <option value="company5">Company 5</option>
            </select>
            <select
              id="insurance-plan"
              name="insurance-plan"
              onChange={(e) => handleDataChange("plan", e.target.value)}
              value={(updatedPatient.plan || updatedPatient.plan=='') ? updatedPatient.plan : data.plan}
            >
              <option value=""></option>
              <option value="plan1">Plan 1</option>
              <option value="plan2">Plan 2</option>
              <option value="plan3">Plan 3</option>
              <option value="plan4">Plan 4</option>
              <option value="plan5">Plan 5</option>
            </select>
          </div>

          <div className="insurance-sub">
            <label htmlFor="issue-date" className="insurance-label">
              Issue Date,  Expiry Date
            </label>
            <input
              type="date"
              id="issue-date"
              name="issue-date"
              onChange={(e) => handleDataChange("issue_date", e.target.value)}
              value={(updatedPatient.issue_date || updatedPatient.issue_date=='') ? updatedPatient.issue_date : data.issue_date}
            />
             <input
              type="date"
              id="expiry-date"
              name="expiry-date"
              onChange={(e) => handleDataChange("expiry_date", e.target.value)}
              value={(updatedPatient.expiry_date || updatedPatient.expiry_date=='') ? updatedPatient.expiry_date : data.expiry_date}
            />
          </div>

          <div className="insurance-sub">
            <label htmlFor="membership-id" className="insurance-label">
              Membership ID,  Additional Info
            </label>
            <input
              type="text"
              id="membership-id"
              name="membership-id"
              onChange={(e) =>
                handleDataChange("membership_id", e.target.value)
              }
              value={(updatedPatient.membership_id || updatedPatient.membership_id=='') ? updatedPatient.membership_id : data.membership_id}
            />
             <select
              id="additional"
              name="additional"
              onChange={(e) =>
                handleDataChange("additional_info", e.target.value)
              }
              value={(updatedPatient.additional_info || updatedPatient.additional_info=='') ? updatedPatient.additional_info : data.additional_info}
            >
              <option value=""></option>
              <option value="additional1">Additional 1</option>
              <option value="additional2">Additional 2</option>
              <option value="additional3">Additional 3</option>
              <option value="additional4">Additional 4</option>
              <option value="additional5">Additional 5</option>
            </select>
          </div>

          <div className="insurance-sub">
            <label htmlFor="eligibility-id" className="insurance-label">
              Eligibility ID,  Payer ID
            </label>
            <input
              type="text"
              id="eligibility-id"
              name="eligibility-id"
              onChange={(e) =>
                handleDataChange("eligibility_id", e.target.value)
              }
              value={(updatedPatient.eligibility_id || updatedPatient.eligibility_id=='') ? updatedPatient.eligibility_id : data.eligibility_id}
            />
             <select
              id="payer-id"
              name="payer-id"
              onChange={(e) => handleDataChange("payer_id", e.target.value)}
              value={(updatedPatient.payer_id || updatedPatient.payer_id=='') ? updatedPatient.payer_id : data.payer_id}
            >
              <option value=""></option>
              <option value="payer1">Payer 1</option>
              <option value="payer2">Payer 2</option>
              <option value="payer3">Payer 3</option>
              <option value="payer4">Payer 4</option>
              <option value="payer5">Payer 5</option>
            </select>
          </div>
        </div>
      </div>
      {/* <button onClick={handleSave}>submit</button> */}
      <div className="pr-card-button">
        <button className="pr-delete-button" onClick={handleDelete}>
          <FaPlus className="pr-delete-button-icons" /> Delete
        </button>
        <button className="pr-edit-button"  onClick={handleSave} >
          <FaPlus className="pr-edit-button-icons" />
          Edit
        </button>
      </div>
    </div>
  );
}

export default PatientRegistration;