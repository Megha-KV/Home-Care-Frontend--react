import React, { useEffect, useState } from "react";
import { FaSyncAlt, FaSave, FaEdit } from "react-icons/fa";
import "./ClinicalEvaluation.css";
import GeneralExamination from "../../components/GeneralExamination";
import ENTExamination from "../../components/EntExamination";
import DoctorHeader from "../../components/Header/DoctorHeader";
import { useLocation } from "react-router-dom";
import { createEvaluation } from "../../api/ClinicalEvaluation";
import { fetchSinglePatient } from "../../api/ClinicalEvaluation";
import { getEvaluation } from "../../api/ClinicalEvaluation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClinicalEvaluation() {
  const [showGeneralExamination, setShowGeneralExamination] = useState(false);
  const [showENTExamination, setShowENTExamination] = useState(false);
  const [evaluated, setEvaluated] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedMRN = localStorage.getItem("mrn");

    if (storedMRN) {
      fetchPatientData(storedMRN); // Pass storedMRN to fetchPatientData
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validate OP No
    if (!formData.op_no) {
      newErrors.op_no = "OP No is required";
    }
    // if (!formData.general_appearance) {
    //   newErrors.general_appearance = "general appearance is required";
    // }
    // if (!formData.vital_signs) {
    //   newErrors.vital_signs = "vital signs is required";
    // }
    // if (!formData.other_signs) {
    //   newErrors.other_signs = "if any other signs,it is required";
    // }
    // if (!formData.ears_examination) {
    //   newErrors.op_no = "OP No is required";
    // }
    // if (!formData.nose_examination) {
    //   newErrors.general_appearance = "general appearance is required";
    // }
    // if (!formData.throat_signs) {
    //   newErrors.vital_signs = "vital signs is required";
    // }
    // if (!formData.neck_examination) {
    //   newErrors.other_signs = "if any other signs,it is required";
    // }

    // Add more validations for other fields as needed

    return newErrors;
  };

  const fetchEvaluation = async () => {
    try {
      const evaluationData = await getEvaluation();
      console.log("Evaluation data:", evaluationData);
      return evaluationData;
    } catch (error) {
      console.error("Error fetching evaluation data:", error);
      // Handle error if needed
      return [];
    }
  };

  useEffect(() => {
    const getEvaluation = async () => {
      try {
        const evaluationData = await fetchEvaluation();
        // Process evaluation data as needed
        console.log("Evaluation data:", evaluationData);
        setEvaluated(evaluationData);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        // Handle error if needed
      }
    };
    getEvaluation();
  }, []);

  const fetchPatientData = async (mrn) => {
    // Accept mrn as a parameter
    try {
      const data = await fetchSinglePatient(mrn);
      // Extracting specific fields
      const { first_name, age, sex, full_name, ref_clinician } = data;
      // Setting the form data with extracted fields
      setFormData({ first_name, age, sex, full_name, ref_clinician });
      // Setting the patient data for other uses if needed
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      // Handle error if needed
    }
  };

  const handleGeneralExaminationChange = () => {
    setShowGeneralExamination(!showGeneralExamination); // Toggle the state
  };

  const handleENTExaminationChange = () => {
    setShowENTExamination(!showENTExamination); // Toggle the state
  };

  useEffect(() => {
    console.log(patientData);
  }, [patientData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSave = async () => {
    try {
      // Retrieve mrn and cid from localStorage
      const mrn = localStorage.getItem("mrn");
      const cid = localStorage.getItem("cid");

      console.log("mrn from localStorage:", mrn);
      console.log("cid from localStorage:", cid);

      // Ensure that mrn and cid are not empty before proceeding
      if (!mrn || !cid) {
        console.error("MRN or CID is missing from localStorage");
        return;
      }

      // Create formData object with mrn and cid
      const formDataWithMRNAndCID = {
        ...formData,
        mr_no: mrn,
        cid: cid,
      };

      console.log("formDataWithMRNAndCID:", formDataWithMRNAndCID);

      // Perform validation
      const validationErrors = validateForm();

      // If there are validation errors, set the errors state and return
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Clear previous errors if validation passes
      setErrors({});

      // Make the POST request with the updated formData
      const responseData = await createEvaluation(formDataWithMRNAndCID);
      console.log("POST Response:", responseData);
      toast.success("The person is clinically evaluated");

      // Fetch updated evaluations and update state
      const updatedEvaluations = await getEvaluation();
      setEvaluated(updatedEvaluations);
    } catch (error) {
      console.error("POST Error:", error);
      toast.error(error.message);
      if (error.response.data.message) toast.error(error.response.data.message);
    }
  };

  const handleRefresh = () => {
    setFormData({
      op_no: "",
    });
    setPatientData(null);
    setShowGeneralExamination(false);
    setShowENTExamination(false);
  };

  return (
    <div className="clinical-evaluation-container">
      <DoctorHeader />
      <div className="header-container">
        <div className="mrn-cid-container">
          <label className="ce-label" htmlFor="mrn">
            MRN
          </label>
          <input
            className="ce-inputs"
            type="text"
            id="mrn"
            value={localStorage.getItem("mrn")}
          />
          <label className="ce-label" htmlFor="cid">
            CID
          </label>
          <input
            className="ce-inputs"
            type="text"
            id="cid"
            value={localStorage.getItem("cid")}
          />
        </div>
        <div className="retrieve-container">
          <button className="ce-button" onClick={handleRefresh}>
            <FaSyncAlt /> Refresh
          </button>
          <button className="ce-button" onClick={handleSave}>
            <FaSave /> Save
          </button>
          <ToastContainer position="top-right" />
        </div>
      </div>

      <div className="clinical-evaluation-sub-container">
        <div className=" ce-table-container ">
          <table className="ns-assign-table">
            <thead>
            <tr>
              <th className="sl-th">Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
            </thead>
            <tbody>
            {evaluated.map((item, index) => (
              <tr key={index}>
                <td>{item.first_name}</td>
                <td>{item.age}</td>
                <td>{item.sex}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="clinical-evaluation-sub-container-left">
          <div className="op-details">
            <div className="op-details-container">
              <label className="ce-label" htmlFor="op-no">
                OP No
              </label>
              <input
                className="ce-input"
                type="text"
                id="op_no"
                name="op_no" // Add name attribute
                onChange={handleInputChange} // Connect onChange event handler
              />
              {errors.op_no && <p className="error-message">{errors.op_no}</p>}
            </div>

            <div className="op-details-container">
              <label className="ce-label" htmlFor="name">
                Name
              </label>
              <input
                className="ce-input"
                type="text"
                id="name"
                value={patientData?.first_name}
              />
            </div>
            <div className="op-details-container">
              <label className="ce-label" htmlFor="age-sex">
                Age
              </label>
              <input
                className="ce-input"
                type="text"
                id="age"
                value={patientData?.age}
              />
            </div>

            <div className="op-details-container">
              <label className="ce-label" htmlFor="age-sex">
                Sex
              </label>
              <input
                className="ce-input"
                type="text"
                id="sex"
                value={patientData?.sex}
              />
            </div>

            <div className="op-details-container">
              <label className="ce-label" htmlFor="h/f-name">
                H/F Name
              </label>
              <input
                className="ce-input"
                type="text"
                id="hf-name"
                value={patientData?.full_name}
              />
            </div>

            <div className="op-details-container">
              <label className="ce-label" htmlFor="doctor-id">
                Doctor
              </label>
              <input
                className="ce-input"
                type="text"
                id="doctor"
                value={patientData?.ref_clinician}
              />
            </div>
            <div className="op-details-container">
              <label
                className="ce-label"
                htmlFor="privacy-mode"
                id="privacy-mode"
              >
                Privacy Mode
              </label>
              <select className="ce-select">
                <option></option>
                <option value="Standard">Standard</option>
                <option value="Confidential">Confidential</option>
                <option value="Sensitive">Sensitive</option>
              </select>
            </div>
          </div>

          <div className="op-items">
            <h4 style={{ marginBlock: "1rem" }}>Examinations</h4>
            <div className="op-items-general-examinations">
              <input
                className="ce-input"
                type="checkbox"
                checked={showGeneralExamination}
                onChange={handleGeneralExaminationChange}
              />
              <label className="ce-label">General Examination</label>
            </div>
            <div className="op-items-ent-examinations">
              <input
                className="ce-input"
                type="checkbox"
                checked={showENTExamination}
                onChange={handleENTExaminationChange}
              />
              <label className="ce-label"> ENT Examination</label>
            </div>
          </div>
        </div>
        <div className="clinical-evaluation-sub-container-right">
          {showGeneralExamination && (
            <GeneralExamination handleInputChange={handleInputChange} />
          )}
          {showENTExamination && (
            <ENTExamination handleInputChange={handleInputChange} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClinicalEvaluation;
