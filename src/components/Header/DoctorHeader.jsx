import React, { useState, useEffect, useContext } from "react";
import "./DoctorHeader.css";
import logo from "../../assets/image/space2.png";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const { user, updateUser } = useContext(UserContext);
  const [doctorInfo, setDoctorInfo] = useState({
    picture: user?.photo, // Replace with actual picture URL
    name: user?.username, // Replace with doctor's name
    role: user?.role, // Replace with doctor's ID
  });

  useEffect(() => {
    // ... (optional) Code to fetch doctor information ...
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      setDateTime(new Date());
    };
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const handleLogout = () => {
    const isConfirm = window.confirm("Are you sure you want to logout?");
    if (isConfirm) {
      localStorage.clear();
      updateUser(null, null);
    }
  };
  useEffect(() => {
    if (!user) {
     
      navigate('/')
    }
  }, [user,updateUser])

  return (
    <header className="header">
      <img src={logo} alt="Health Logo" />
      <div className="header-rightside">
        <span className="datetime">
          {dateTime.toLocaleDateString()} &nbsp;
          {dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Set hour12 to false for 24-hour clock
          })}
        </span>

        {user && (
        <img src={`http://127.0.0.1:8000${user.photo}`} alt="photo"  className="user-photo"/>
      )}

        <div className="doctor-info">
          <div className="name-role">
            <p>{doctorInfo.name}</p>
            <p>{doctorInfo.role}</p>
          </div>
        </div>

        <div className="icons">
          <button onClick={handleLogout} className="logout-button" title="Logout">
          <IoIosLogOut className="logout-icon"  />
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;