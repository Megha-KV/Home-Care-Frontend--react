import React, { useState, useEffect, useContext } from "react";
import "./AdminHeader.css";
import logo from "../../assets/image/space2.png";
import { IoIosLogOut } from "react-icons/io";
// import { RxDragHandleDots2 } from "react-icons/rx";
// import { RxLetterCaseUppercase } from "react-icons/rx";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const { user, updateUser } = useContext(UserContext);
  const [adminInfo, setAdminInfo] = useState({
    picture: user?.photo, // Replace with actual picture URL
    name: user?.username,
    role: user?.role,
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
      navigate("/");
    }
  }, [user, updateUser]);

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
          <img
            src={`http://127.0.0.1:8000${user.photo}`}
            alt="User Photo"
            className="user-photo"
            height={40}
            width={40}
          />
        )}

        <div className="admin-info">
          <div className="name-role">
            <p>{adminInfo.name}</p>
            <p>{adminInfo.role}</p>
          </div>
        </div>

        <div className="icons">
          {/* <RxLetterCaseUppercase className="icon icon-1" /> */}
          {/* <RxDragHandleDots2 className="icon" /> */}
          <button
            onClick={handleLogout}
            className="logout-button"
            title="Logout"
          >
            <IoIosLogOut className="logout-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
