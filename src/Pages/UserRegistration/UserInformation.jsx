import React, { useState, useEffect } from "react";
import "./UserInformation.css";
import { createUser } from "../../api/UserInformation";
import { fetchUsers } from "../../api/UserInformation";
import { deleteUser } from "../../api/UserInformation";
import { BASE_URL, BASE_URL_I } from "../../Global";
import { updateUser } from "../../api/UserInformation";
import AdminHeader from "../../components/Header/AdminHeader";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserInformation() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!formData.first_name) errors.first_name = "First Name is required";
    if (!formData.middle_name) errors.middle_name = "Middle Name is required";
    if (!formData.last_name) errors.last_name = "Last Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.job) errors.job = "Job is required";
    if (!formData.role) errors.role = "Role is required";
    if (!formData.user_id) errors.user_id = "ID is required";
    if (!formData.password) errors.password = "Password is required";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const userData = await fetchUsers();
        console.log(userData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getUsers();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        photo: reader.result, // Set base64-encoded image string in formData
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSave = async () => {
    if (!validateForm()) return;

    console.log("user data:", formData);
    try {
      const responseData = await createUser(formData);
      console.log("POST Response:", responseData);
      // navigate("/patient-registration");
      async function getUsers() {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
          toast.success(" saved successfully");
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }
      getUsers();
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  const handleUpdate = async () => {
    // if (!validateForm()) return;

    console.log("user data:", formData);
    try {
      const responseData = await updateUser(formData);
      console.log("update Response:", responseData);

      // Fetch users again after saving

      async function getUsers() {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
          toast.success(" updation successful");
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error(error.message);
          if (error.response.data.message)
            toast.error(error.response.data.message);
        }
      }
      getUsers();
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      window.alert("no user selected");
      return;
    }

    try {
      const data = { user_id: selectedUser.user_id }; // Assuming user_id is the identifier for the user
      console.log("Deleting user:", data);

      const responseData = await deleteUser(data);
      console.log("Delete Response:", responseData);

      // Remove the deleted user from the users state
      async function getUsers() {
        try {
          const userData = await fetchUsers();
          console.log(userData);
          setUsers(userData);
          setFormData({});
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      getUsers();
      toast.success("User deleted successfully");
      setSelectedUser(null);
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Error deleting user");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleOptionRadioChange = async (user) => {
    if (!isBase64Image(user.photo)) {
      const base64String = await urlToBase64(user.photo);
      user.photo = base64String;
    }
    setSelectedUser(user);
    setFormData(user);
  };
  async function urlToBase64(url) {
    try {
      let imageurl = `${BASE_URL_I}` + url;
      const response = await fetch(imageurl);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  }
  function isBase64Image(base64String) {
    // Create a regular expression to match base64 image data
    const regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;

    // Check if the base64 string matches the regex pattern
    return regex.test(base64String);
  }

  const resetForm = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      job: "",
      role: "",
      type_mode: "",
      license: "",
      validity: "",
      user_id: "",
      password: "",
      cs_allow: "",
      session_exp: "",
      mf_no: "",
      creation_date: "",
      photo: null, // Assuming photo is set to null to clear the image
    });
  };

  return (
    <>
      <AdminHeader />
      <div className="table-container-user">
        <div style={{ display: "flex" }}>
          <table className="user-table">
            <thead>
              <tr>
                <th></th>
                <th className="table-th">SL</th>
                <th className="table-th">Users</th>
                <th className="table-th">FirstName</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td className="table-td">
                    <input
                      type="radio"
                      name="selectedUser"
                      value={user.user_id} // Assuming user_id is unique
                      checked={
                        selectedUser && selectedUser.user_id === user.user_id
                      }
                      onChange={() => handleOptionRadioChange(user)}
                    />
                  </td>
                  <td className="table-td">{index + 1}</td>
                  <td className="table-td">{user.user_id}</td>
                  <td className="table-td">{user.first_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="user-form">
            <form onSubmit={handleSubmit} className="user-form-wrapper">
              <div className="user-form-left">
                <div style={{ position: "relative", marginBlock: "8px" }}>
                  <div className="form-group">
                    <label className="user-label" htmlFor="firstName">
                      First Name:
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="firstName"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formErrors.first_name && (
                    <p
                      className="error"
                      style={{ position: "relative", left: "45%" }}
                    >
                      {formErrors.first_name}
                    </p>
                  )}
                </div>

                {/* Add similar form elements for middleName, lastName, email, job, role */}
                <div style={{ position: "relative", marginBlock: "8px" }}>
                  <div className="form-group">
                    <label className="user-label" htmlFor="middleName">
                      Middle Name:
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="middleName"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formErrors.middle_name && (
                    <p
                      className="error"
                      style={{ position: "relative", left: "45%" }}
                    >
                      {formErrors.middle_name}
                    </p>
                  )}
                </div>

                <div style={{ position: "relative", marginBlock: "8px" }}>
                  <div className="form-group">
                    <label className="user-label" htmlFor="lastName">
                      Last Name:
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="lastName"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formErrors.last_name && (
                    <p
                      className="error"
                      style={{ position: "relative", left: "45%" }}
                    >
                      {formErrors.last_name}
                    </p>
                  )}
                </div>

                <div style={{ position: "relative", marginBlock: "8px" }}>
                <div className="form-group">
                  <label className="user-label" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {formErrors.email && (
                      <p className="error" style={{ position: "relative", left: "45%" }}>{formErrors.email}</p>
                    )}
                </div>

                <div style={{ position: "relative", marginBlock: "8px" }}>
                <div className="form-group">
                  <label className="user-label" htmlFor="job">
                    Job:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="job"
                    name="job"
                    value={formData.job}
                    onChange={handleInputChange}
                  />
                </div>
                {formErrors.job && (
                      <p className="error" style={{ position: "relative", left: "45%" }}>{formErrors.job}</p>
                    )}
                </div>

                <div style={{ position: "relative", marginBlock: "8px" }}>
                <div className="form-group">
                  <label className="user-label" htmlFor="role">
                    Role:
                  </label>
                  <select
                    className="form-input"
                    id="role"
                    name="role"
                    onChange={handleInputChange}
                    value={formData.role}
                  >
                    <option value=""></option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                  </select>
                </div>
                {formErrors.role && (
                      <div className="error" style={{ position: "relative", left: "45%" }}>{formErrors.role}</div>
                    )}
                </div>


                <div className="form-group">
                  <label className="user-label" htmlFor="typeMode">
                    Type Mode:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="typeMode"
                    name="type_mode"
                    value={formData.type_mode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="user-form-right">
                <div className="form-group">
                  <label className="user-label" htmlFor="license">
                    License:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="license"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add similar form elements for validity, idPwd, csAllowSt, sessionExp, mfNo, creationDate */}
                <div className="form-group">
                  <label className="user-label" htmlFor="validity">
                    Validity:
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    id="validity"
                    name="validity"
                    value={formData.validity}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ position: "relative", marginBlock: "8px" }}>
                <div className="form-group">
                  <label className="user-label" htmlFor="idPwd">
                    ID:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="id"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                  />
                </div>
                {formErrors.user_id && (
                      <div className="error" style={{ position: "relative", left: "45%" }}>{formErrors.user_id}</div>
                    )}
                </div>

                <div style={{ position: "relative", marginBlock: "8px" }}>
                <div className="form-group">
                  <label className="user-label" htmlFor="idPwd">
                    Pwd:
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="Pwd"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                {formErrors.password && (
                      <div className="error" style={{ position: "relative", left: "45%" }}>{formErrors.password}</div>
                    )}
                </div>
                <div className="form-group">
                  <label className="user-label" htmlFor="csAllowSt">
                    CS Allow St:
                  </label>
                  
                  <select
                    className="form-input"
                    id="csAllowSt"
                    name="cs_allow"
                    onChange={handleInputChange}
                    value={formData.cs_allow}
                  >
                    <option value=""></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="user-label" htmlFor="sessionExp">
                    SessionExp:
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    id="sessionExp"
                    name="session_exp"
                    value={formData.session_exp}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="user-label" htmlFor="mfNo">
                    MF No:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="mfNo"
                    name="mf_no"
                    value={formData.mf_no}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="user-label" htmlFor="creationDate">
                    Creation Date:
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    id="creationDate"
                    name="creation_date"
                    value={formData.creation_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="image-upload">
            photo
            <div className="image-box">
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Uploaded"
                  height="200px"
                  width="200px"
                  style={{ objectFit: "fill" }}
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="file-input"
              name="photo"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="file-input" className="browse-button">
              Browse
            </label>
          </div>
        </div>
      </div>

      <div className="user-buttons">
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="update" onClick={handleUpdate}>
          Update
        </button>
        <button className="new" onClick={resetForm}>
          New
        </button>
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default UserInformation;
