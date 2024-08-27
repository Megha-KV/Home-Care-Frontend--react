import React, { useEffect, useState } from "react";
import "./PatientList.css";
import { Link } from "react-router-dom";
import { getPatients } from "../api/Schedule";
import AdminHeader from "../components/Header/AdminHeader";

function PatientList() {
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(patients);
  }, [patients])
  

  return (
  <>
    <AdminHeader/>
    <div className="appointment-container">
      <h3 className="head">Patient List</h3> <br/>
      <div className="patient-table-header">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="first-tr"> </th>
                <th className="first-tr">Photo</th>
                <th className="first-tr">MRN</th>
                <th className="first-tr">Name</th>
                <th className="first-tr">Contact No</th>
                <th className="first-tr">Actions</th>{" "}
                {/* Assuming you want an actions column */}
              </tr>
            </thead>
            <tbody>
              {patients.map((val, key) => (
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
                    <span className="table-box">{val.mr_no}</span>
                  </td>
                  <td>
                    <span className="table-box">{val.first_name}</span>
                  </td>
                  <td>
                    <span className="table-box">{val.contact_no}</span>
                  </td>
                  <td>
                    <Link to={`/patient-details/${val.mr_no}`}>
                      View Patient
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default PatientList;