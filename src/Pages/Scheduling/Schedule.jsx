import React, { useState, useEffect } from "react";
import "./Schedule.css";
import { doctorConflict, getPatients } from "../../api/Schedule";
import { nurseSchedule, nurseConflict } from "../../api/Schedule";
import { doctorSchedule } from "../../api/Schedule";
import { fetchUsers } from "../../api/UserInformation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import AdminHeader from "../../components/Header/AdminHeader";

function Schedule() {
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  const [selectedNurse, setSelectedNurse] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState(
    moment().add(30, "days").format("YYYY-MM-DD")
  );
  const [endTime, setEndTime] = useState("");
  const [scheduleDates, setScheduleDates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [scheduledPatient, setScheduledPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const patientsData = await getPatients(); // Assuming getPatients is an asynchronous function
        setPatients(patientsData);
        console.log(patientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
        console.log(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    calculateScheduleDates(startDate, endDate);
    //calculateScheduleDates(selectedStartDate, endDate);
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    console.log(selectedStartDate);
    setStartDate(selectedStartDate);
    calculateScheduleDates(selectedStartDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    setEndDate(selectedEndDate);
    calculateScheduleDates(startDate, selectedEndDate);
  };

  const handleStartTimeChange = (event) => {
    const selectedStartTime = event.target.value;
    setStartTime(selectedStartTime);
  };

  const handleEndTimeChange = (event) => {
    const selectedEndTime = event.target.value;
    setEndTime(selectedEndTime);
  };

  const calculateScheduleDates = (start, end) => {
    const dates = [];
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(start);
    const endDate = new Date(end);
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push({
        date: formatDate(date),
        day: date.toLocaleDateString("en-US", { weekday: "long" }),
      });
    }
    setScheduleDates(dates);
  };

  // Define the comparator function
  const compareByRole = (a, b) => {
    // Extract the role from each item
    const roleA = a.Role.toLowerCase();
    const roleB = b.Role.toLowerCase();

    // Sort doctors before nurses
    if (roleA === "doctor" && roleB !== "doctor") {
      return -1; // 'doctor' comes before other roles
    } else if (roleB === "doctor" && roleA !== "doctor") {
      return 1; // 'doctor' comes after other roles
    } else {
      return 0; // maintain the current order for other roles
    }
  };

  // Sort the data array using the comparator function
  const sortedData = [...data].sort(compareByRole);

  const handleDoctorClick = (doctorId) => {
    setSelectedDoctor(doctorId);
    setSelectedNurse(null);
  };

  const handleNurseClick = (nurseId) => {
    setSelectedNurse(nurseId);
    setSelectedDoctor(null);
  };
  // When scheduling, send selected patient and nurse or doctor IDs to backend
  const handlePatientClick = (patientId) => {
    setSelectedPatient(patientId);
  };

  const handleSchedule = async () => {
    if (selectedPatient && (selectedNurse || selectedDoctor)) {
      // Prepare the data to send to the backend
      let requestData;
      if (selectedNurse) {
        requestData = {
          mr_no: selectedPatient,
          // Use selectedNurse if it exists, otherwise use selectedDoctor
          nurse_id: selectedNurse,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
        };
        //call nurseappointment api
        try {
          const userData = await nurseSchedule(requestData);
          //setUsers(userData);
          console.log(userData);
          toast.success("Nurse scheduled successfully");
          setLoading(false);
          setSelectedPatient(null);
        } catch (error) {
          console.error("Error creating schedule:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }

      if (selectedDoctor) {
        requestData = {
          mr_no: selectedPatient,
          doctor_id: selectedDoctor,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
        };
        //call doctorschdeule api
        try {
          const userData = await doctorSchedule(requestData);
          //setUsers(userData);
          console.log(userData);
          toast.success("Doctor scheduled successfully");
          setLoading(false);
          setSelectedPatient(null);
        } catch (error) {
          console.error("Error creating schedule:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }
    } else {
      // Handle error, e.g., show a message that both patient and nurse/doctor must be selected
      toast.error("Please select both a patient and a nurse or doctor");
    }
  };

  const handleCheckConflict = async () => {
    if (selectedPatient && (selectedNurse || selectedDoctor)) {
      // Prepare the data to send to the backend
      let requestData;
      if (selectedNurse) {
        requestData = {
          // Use selectedNurse if it exists, otherwise use selectedDoctor
          mr_no: selectedPatient,
          nurse_id: selectedNurse,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
        };
        //call nurseappointment api
        try {
          const userData = await nurseConflict(requestData); // Assuming getPatients is an asynchronous function
          //setUsers(userData);
          console.log(userData);
          toast.success("No conflicts found");
          setLoading(false);
        } catch (error) {
          console.error("Error checking conflicts:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }

      if (selectedDoctor) {
        requestData = {
          mr_no: selectedPatient,
          // Use selectedNurse if it exists, otherwise use selectedDoctor
          doctor_id: selectedDoctor,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
        };
        //call doctorschdeule api
        try {
          const userData = await doctorConflict(requestData); // Assuming getPatients is an asynchronous function
          //setUsers(userData);
          console.log(userData);
          toast.success("No conflicts found");
          setLoading(false);
        } catch (error) {
          console.error("Error checking schedules:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }
    } else {
      // Handle error, e.g., show a message that both patient and nurse/doctor must be selected
      toast.error("Please select both a patient and a nurse or doctor");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="ns-container">
        <div className="ns-sub-container2">
          <div className="ns-left-sub-container">
            <div className="ns-heading">
              <h4 style={{ fontSize: "16px", margin: 0   }}>Professionals Assigned</h4>
            </div>
            {/* // Render the sorted data in your JSX */}
            <table className="ns-assign-table">
              <thead>
                <tr>
                  <th className="sl-th">ID</th>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {/*  {users.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.first_name}</td>
                  <td>{item.job}</td>
                </tr> 
              ))} */}
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`ns-card ${
                      (user.job === "Doctor" &&
                        user.user_id === selectedDoctor) ||
                      (user.job === "Nurse" && user.user_id === selectedNurse)
                        ? "selected-card"
                        : ""
                    }`}
                    onClick={() =>
                      user.job === "Doctor"
                        ? handleDoctorClick(user.user_id)
                        : handleNurseClick(user.user_id)
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{user.first_name}</td>
                    <td>{user.job}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ns-right-sub-container">
            <div className="ns-heading">
              <h4 style={{ fontSize: "16px", margin: 0 }}>
                 Assign Schedule
              </h4>
            </div>
            <div className="ns-card-container">
              {patients?.map((patient, index) => (
                <div
                  key={index}
                  className={`ns-card ${
                    selectedPatient === patient.mr_no
                      ? "selected-card"
                      : "" || scheduledPatient[index] === true
                      ? "scheduled-card"
                      : ""
                  }`}
                  onClick={() =>
                    handlePatientClick(patient.mr_no, patient.consult_id)
                  }
                >
                  <p>MRN: {patient.mr_no}</p>
                  <p>{patient.first_name}</p>
                </div>
              ))}
            </div>

            <div className="ns-scheduling">
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
              />

              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
              />

              <input
                type="time"
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
              />

              <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
              />

              <div class="ns-scheduling-buttons">
                {/* <button type="button" class="select-all">
                Select All
              </button>
              <button type="button" class="deselect-all">
                Deselect All
              </button> */}
                <button
                  type="button"
                  class="check-conflict"
                  onClick={handleCheckConflict}
                >
                  Check Conflict
                </button>
                <button type="button" class="schedule" onClick={handleSchedule}>
                  Schedule
                </button>
                <ToastContainer position="top-right" />
              </div>
            </div>
            <div className="ns-nurse-assigned-table">
              <table className="ns-schedule-table">
                <tbody>
                  {scheduleDates.map((dateObj, index) => {
                    if (index % 7 === 0) {
                      return (
                        <tr key={index} style={{ height: " 70px " }}>
                          {[...Array(7)].map((_, i) => (
                            <td key={i}>{scheduleDates[index + i]?.date}</td>
                          ))}
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
