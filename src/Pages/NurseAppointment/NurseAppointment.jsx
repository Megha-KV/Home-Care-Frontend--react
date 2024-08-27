import React, { useState, useEffect } from "react";
import "./NurseAppointment.css";
import NurseHeader from "../../components/Header/NurseHeader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  fetchPatientForNurse,
  fetchFilteredPatientsOfNurse,
} from "../../api/NurseAppointment";
import { Link } from "react-router-dom";

function NurseAppointment() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [user, setUser] = useState("");

  async function getUserIdFromLocalStorage() {
    try {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData.user_id;
        console.log(userId);
        setUser(userId) ;
      } else {
        console.log("User data not found in local storage");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user ID:", error);
      throw error;
    }
  }
  
  useEffect(() => {
    getUserIdFromLocalStorage()
  }, [])





  const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => setDate(newDate);
    return (
      <div className="calender-div">
        <Calendar onChange={onChange} value={date} />
      </div>
    );
  };
  // Function to handle date change in the search input
  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Function to clear the search date
  const clearSearchDate = () => {
    setSearchDate("");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchPatientForNurse(user);
        setPatients(userData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]); 


  // const getUsers = async (user) => {
  //   try {
  //     const userData = await fetchPatientForNurse(user);
  //     setPatients(userData);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();

    // Format the date as yyyy-mm-dd
    const formattedDate = currentDate.toISOString().slice(0, 10);

    // Set the value of the first input to the current date
    setInput1Value(formattedDate);

    // Check if it's today's date
    const today = new Date().toLocaleDateString("en-US");
    const inputDate = new Date(formattedDate).toLocaleDateString("en-US");

    if (today === inputDate) {
      setInput2Value("Today");
    }
  }, []);

  // // Fetch all patients data when component mounts
  // useEffect(() => {
  //   console.log("get patient");
  //   getUsers(user);
  // }, [user]);

  // Fetch filtered patients based on selected date
  useEffect(() => {
    const fetchPatientsByDate = async () => {
      try {
        if (searchDate) {
          const filteredData = await fetchFilteredPatientsOfNurse(searchDate);
          setFilteredPatients(filteredData);
        } else {
          setFilteredPatients([]); // Clear filteredPatients when search date is empty
          getUsers(); // Fetch all patients again
        }
      } catch (error) {
        console.error("Error fetching filtered patients:", error);
      }
    };

    fetchPatientsByDate();
  }, [searchDate]);

  // Function to handle click on "Go to Initial Evaluation" link
  const handleInitialEvaluationClick = (mrn, cid) => {
    localStorage.setItem("mrn", mrn);
    localStorage.setItem("cid", cid);
  };

  return (
    <>
      <NurseHeader />
      <div className="appointment">
        <div className="appointment-container">
          <h3 className="head">Appointment List Table 2</h3>
          <div className="input-container">
            <input
              type="text"
              className="text"
              value={input1Value}
              onChange={(e) => setInput1Value(e.target.value)}
            />
            <input
              type="text"
              className="text"
              value={input2Value}
              onChange={(e) => setInput2Value(e.target.value)}
            />
            <input
              type="date"
              // placeholder="Enter date (yyyy-mm-dd)"
              value={searchDate}
              onChange={handleSearchDateChange}
              className="search-input"
            />
            <button className="clear-btn" onClick={clearSearchDate}>
              Clear
            </button>
          </div>
          <div className="nurse-table-header">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="first-tr"> </th>
                    <th className="first-tr">Photo</th>
                    <th className="first-tr">Date</th>
                    <th className="first-tr">MRN</th>
                    <th className="first-tr">CID</th>
                    <th className="first-tr">Visit Time</th>
                    <th className="first-tr">Customer Name</th>
                    <th className="first-tr">Location</th>
                    <th className="first-tr"> </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0
                    ? filteredPatients.map((val, key) => (
                        <tr key={key} className="second-box">
                          <td>
                            <span className="table-box">{key + 1}</span>
                          </td>
                          <td>
                            <span className="table-box">
                              <img
                                src={`http://127.0.0.1:8000${val.photo}`}
                                alt=""
                                height={"50px"}
                              />
                            </span>
                          </td>
                          <td>
                            <span className="table-box">{val.start_date}</span>
                          </td>
                          <td>
                            <span className="table-box">{val.mr_no}</span>
                          </td>
                          <td>
                            <span className="table-box">{val.consult_id}</span>
                          </td>
                          <td>
                            <span className="table-box">
                              {val.start_time} - {val.end_time}
                            </span>
                          </td>
                          <td>
                            <span className="table-box">
                              {val.patient_name}
                            </span>
                          </td>
                          <td>
                            <span className="table-box">{val.address}</span>
                          </td>
                          <td>
                            <Link
                              to={`/initial-evaluation?mrn=${val.mr_no}&cid=${val.consult_id}`}
                              onClick={() =>
                                handleInitialEvaluationClick(
                                  val.mr_no,
                                  val.consult_id
                                )
                              }
                            >
                              Go to Initial Evaluation
                            </Link>
                          </td>
                        </tr>
                      ))
                    : patients.map((val, key) => (
                        <tr key={key} className="second-box">
                          <td>
                            <span className="table-box">{key + 1}</span>
                          </td>
                          <td>
                            <span className="table-box">
                              <img
                                src={`http://127.0.0.1:8000${val.photo}`}
                                alt=""
                                height={"50px"}
                              />
                            </span>
                          </td>
                          <td>
                            <span className="table-box">{val.start_date}</span>
                          </td>
                          <td>
                            <span className="table-box">{val.mr_no}</span>
                          </td>
                          <td>
                            <span className="table-box">{val.consult_id}</span>
                          </td>
                          <td>
                            <span className="table-box">
                              {val.start_time}-{val.end_time}
                            </span>
                          </td>
                          <td>
                            <span className="table-box">
                              {val.patient_name}
                            </span>
                          </td>
                          <td>
                            <span className="table-box">{val.address}</span>
                          </td>
                          <td>
                            {/* Link to Initial Evaluation with onClick event to store MRN */}
                            <Link
                              to={`/vital-signs?mrn=${val.mr_no}&cid = ${val.consult_id}`}
                              onClick={() =>
                                handleInitialEvaluationClick(
                                  val.mr_no,
                                  val.consult_id
                                )
                              }
                            >
                              Go to Vital Tracking
                            </Link>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <MyCalendar />
      </div>
    </>
  );
}
export default NurseAppointment;
