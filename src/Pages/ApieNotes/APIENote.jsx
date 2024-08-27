import React, { useState } from "react";
import "./APIENote.css";
import PatientInfo from "../../components/PatientInfo";
import Vitals from "../../components/Vitals";
import { MdNoteAlt } from "react-icons/md";
import NurseHeader from "../../components/Header/NurseHeader";
import { FaPlus } from "react-icons/fa";
import { createTextAreas } from "../../api/apie";
import { fetchHistory, fetchSingleHistory, deleteNote } from "../../api/apie";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateNote } from "../../api/apie";
import InnerHeader from "../../components/InnerHeader";
import { ToastContainer, toast } from "react-toastify";

function APIENote() {
  const [apieNote, setApieNote] = useState({});
  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleString(undefined, { hour12: false })
  );

  useEffect(() => {
    // Update the currentDate every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date().toLocaleString(undefined, { hour12: false }));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const validateNote = (note) => {
    const newErrors = {};
    if (!note.assessment) {
      newErrors.assessment = "Assessment is required";
    }
    if (!note.planning) {
      newErrors.planning = "Planning is required";
    }
    if (!note.intervention) {
      newErrors.intervention = "Intervention is required";
    }
    if (!note.evaluation) {
      newErrors.evaluation = "Evaluation is required";
    }
    return newErrors;
  };

  // const navigate = useNavigate();

  const handleSaveNextClick = async () => {
    const validationErrors = validateNote(apieNote);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes
    try {
      const mrn = localStorage.getItem("mrn");
      const apie = {
        ...apieNote,
        mrn: mrn,
      };
      const responseData = await createTextAreas(apie);
      console.log("POST Response:", responseData);
      getHistory();
      setApieNote({
        assessment: "",
        planning: "",
        intervention: "",
        evaluation: "",
      });
      toast.success("Saved Successfully");
    } catch (error) {
      toast.error("Failed to save note");
    }
  };

  const handleTextareaChange = (field, value) => {
    setApieNote((prevNote) => ({
      ...prevNote,
      [field]: value,
    }));
  };

  const handleHistoryItemClick = async (id) => {
    try {
      const selectedApieNote = await fetchSingleHistory(id);
      const formattedSelectedApie = {
        ...selectedApieNote,
        date: formatDate(selectedApieNote.date),
      };
      console.log(selectedApieNote);
      setApieNote(formattedSelectedApie); // Corrected from 'form' to 'formattedSelectedApie'
    } catch (error) {
      console.error("Error fetching single history:", error);
      toast.error("Error fetching note details");
    }
  };

  const getHistory = async () => {
    try {
      const mrn = localStorage.getItem("mrn");
      const historyData = await fetchHistory(mrn);

      // Format date for each history item
      const formattedHistoryData = historyData.map((item) => ({
        ...item,
        date: formatDate(item.date),
      }));

      setHistory(formattedHistoryData);
      console.log("History Data:", formattedHistoryData);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Error fetching history");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Include AM/PM indicator
    };
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleUpdate = async () => {
    const validationErrors = validateNote(apieNote);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes
    try {
      const responseData = await updateNote(apieNote);
      toast.success("Updated Successfully");
      setApieNote({
        // Clear all fields
        assessment: "",
        planning: "",
        intervention: "",
        evaluation: "",
      });
      console.log("Update Response:", responseData);
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  const handleDelete = async () => {
    console.log("delete button clicked");
    try {
      const idObject = { id: apieNote.id };
      const response = await deleteNote({ data: idObject });
      console.log("Delete Response:", response);
      toast.success(" Deleted Successfully");
      setApieNote({
        // Clear all fields
        assessment: "",
        planning: "",
        intervention: "",
        evaluation: "",
      });
      await getHistory();
    } catch (error) {
      toast.error("Delete Error:", error);
    }
  };

  return (
    <div>
      <NurseHeader />
      <PatientInfo />
      {/* <InnerHeader /> */}
      <Vitals />

      <div className="nurse-notes">
        <div className="note-wrapper">
          <div className="notes-header">
            <h2>
              <MdNoteAlt className="note-icon" />
              &nbsp;&nbsp;APIE Nursing Notes
            </h2>
          </div>
          <p>{currentDate}</p>

          {/* apie note entering textareas */}
          <div className="row">
            <div className="column">
              <textarea
                className="plain-textarea"
                placeholder="Assessment"
                value={apieNote.assessment}
                onChange={(e) =>
                  handleTextareaChange("assessment", e.target.value)
                }
              ></textarea>
              {errors.assessment && (
                <p className="error-message">{errors.assessment}</p>
              )}
            </div>

            <div className="column">
              <textarea
                className="plain-textarea"
                placeholder="Planning"
                value={apieNote.planning}
                onChange={(e) =>
                  handleTextareaChange("planning", e.target.value)
                }
              ></textarea>
              {errors.planning && (
                <p className="error-message">{errors.planning}</p>
              )}
            </div>
            <div className="column">
              <textarea
                className="plain-textarea"
                placeholder="Intervention"
                value={apieNote.intervention}
                onChange={(e) =>
                  handleTextareaChange("intervention", e.target.value)
                }
              ></textarea>
              {errors.intervention && (
                <p className="error-message">{errors.intervention}</p>
              )}
            </div>
            <div className="column">
              <textarea
                className="plain-textarea"
                placeholder="Evaluation"
                value={apieNote.evaluation}
                onChange={(e) =>
                  handleTextareaChange("evaluation", e.target.value)
                }
              ></textarea>
              {errors.evaluation && (
                <p className="error-message">{errors.evaluation}</p>
              )}
            </div>
          </div>

          <div className="card-button">
            <button className="delete-button" onClick={handleDelete}>
              <FaPlus className="delete-button-icons" /> Delete
            </button>
            <button className="edit-button" onClick={handleUpdate}>
              <FaPlus className="edit-button-icons" />
              Edit
            </button>
            <button className="save-next-button" onClick={handleSaveNextClick}>
              <FaPlus className="save-next-button-icons" />
              Save & Next
            </button>
            <ToastContainer position="top-right" />
          </div>
        </div>

        {/* history list */}
        <div className="history">
          <h3>History</h3>
          <div className="history-list">
            {history?.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => handleHistoryItemClick(item.id)}
              >
                <span className="history-field">{index + 1} -</span>
                <span className="history-field">
                  {item.nurse_name} <br /> {item.date.toLocaleString()}
                </span>
                <span className="history-field"></span>
                <span className="history-field"></span>
                <span className="history-field"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default APIENote;
