import React, { useEffect, useState } from "react";
import PatientInfo from "../../components/PatientInfo";
import Vitals from "../../components/Vitals";
import "./NursingNote.css";
import NurseHeader from "../../components/Header/NurseHeader";
import { FaPlus } from "react-icons/fa";
import {
  createNote,
  fetchNurseHistory,
  fetchSingleNurseHistory,
  updateNurseNote,
  deleteNurseNote,
} from "../../api/NursingNote";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NursingNote = () => {
  const [note, setNote] = useState({});
  const [history, setHistory] = useState([]);
  const [entry, setEntry] = useState({});
  const [errors, setErrors] = useState({}); // State for validation errors
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    console.log(entry);
  }, [entry]);

  const getHistory = async () => {
    try {
      const mrn = localStorage.getItem("mrn");
      const historyData = await fetchNurseHistory(mrn);
      
      // Format date for each history item
      const formattedHistoryData = historyData.map(item => ({
        ...item,
        date: formatDate(item.date)
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
      year: "numeric"
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true // Include AM/PM indicator
    };
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  const validateNote = (note) => {
    const newErrors = {};
    if (!note.nurse_note) {
      newErrors.nurse_note = "Nurse note is required";
    }
    return newErrors;
  };

  const handleSaveNextClick = async () => {
    const validationErrors = validateNote(note);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes

    try {
      const mrn = localStorage.getItem('mrn');
      const noteData = { ...note, mrn };
      const responseData = await createNote(noteData);
      console.log("POST Response:", responseData);
      toast.success("Saved successfully");
      setNote({});
      getHistory();
    } catch (error) {
      console.error("POST Error:", error);
      toast.error("Error saving note");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleTextareaChange = (field, value) => {
    setNote((prevNote) => ({
      ...prevNote,
      [field]: value,
    }));
  };

  const handleNurseHistoryItemClick = async (id) => {
    try {
      const selectedNurseNote = await fetchSingleNurseHistory(id);
      // Format the date before setting it to the state
      const formattedSelectedNote = {
        ...selectedNurseNote,
        date: formatDate(selectedNurseNote.date)
      };
      setEntry(formattedSelectedNote);
      setIsVisible(true);
    } catch (error) {
      console.error("Error fetching single nurse history:", error);
      toast.error("Error fetching note details");
    }
  };

  const handleInputChange = (newValue) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      nurse_note: newValue,
    }));
  };

  const handleUpdate = async () => {
    const validationErrors = validateNote(entry);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear errors if validation passes

    console.log("edit button clicked");
    try {
      const responseData = await updateNurseNote(entry);
      console.log("Update Response:", responseData);
      toast.success("Updated successfully");
      setEntry({});
      getHistory(); // Refresh history after update
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Error updating note");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDelete = async () => {
    console.log("delete button clicked");
    try {
      await deleteNurseNote(entry.id);
      setNote({});
      setEntry({});
      toast.success("Deleted successfully");
      getHistory(); // Refresh history after delete
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="patient-entry">
      <NurseHeader />
      <PatientInfo />
      <Vitals />
      <div className="nurse-note-container">
        <div className="nurse-note" style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <h4>Nursing Note</h4>
          <main className="card-body">
            <textarea
              name="nurse_note"
              className="nursing-note-textarea"
              placeholder=" "
              value={note.nurse_note || ""}
              onChange={(e) => handleTextareaChange("nurse_note", e.target.value)}
              rows={8}
              style={{ height: "100%" }}
            />
            {errors.nurse_note && <p className="error-message">{errors.nurse_note}</p>}
          </main>
        </div>

        <div className="entry-card">
          <div className="container" style={{ height: "100%" }}>
            <h4>Entry Details</h4>
            <table className="entry-table">
              <tbody>
                <tr className="nursenote-tr">
                  <th className="table-header second-column">Note</th>
                  <th className="table-header">Date & Time</th>
                  <th className="table-header">Specialist</th>
                </tr>
                <tr>
                  <td className="table-cell second-column">
                    <div className="inputs-container">
                      <textarea  className={`custom-input ${isVisible ? 'visible' : ''}`}
                        type="text"
                        value={entry.nurse_note || ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder=" "
                      /><br/>
                      {errors.nurse_note && <p className="error-message">{errors.nurse_note}</p>}
                    </div>
                  </td>
                  <td className="table-cell">{entry.date}</td>
                  <td className="table-cell">
                    <span>{entry.nurse_name}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="history-container">
          <h3>History</h3>
          <div className="nursing-notes-history-list">
            {history.length > 0 ? (
              history.map((item, index) => (
                <div
                  key={index}
                  className="nn-history-item"
                  onClick={() => handleNurseHistoryItemClick(item.id)}
                >
                  <span className="nn-history-field">{index + 1} -</span>
                  <div className="divider"></div>
                  <span className="nn-history-field">
                    {item.nurse_name} <br /> {item.date}
                  </span>
                </div>
              ))
            ) : (
              <div>No history available</div>
            )}
          </div>
        </div>
      </div>

      <div className="card-button">
        <button className="delete-button" onClick={handleDelete}>
          <FaPlus className="delete-button-icons" />
          Delete
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
  );
};

export default NursingNote;
