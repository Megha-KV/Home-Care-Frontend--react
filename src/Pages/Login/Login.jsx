import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { REFRESH_TOKEN } from "../../constants";
import { FaEye ,  FaEyeSlash  } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  console.log(user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Perform authentication using axios
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        localStorage.setItem("user", response.data.user);

        updateUser(response.data);
        setIsLoggedIn(true);
        if (response.data.role == "Admin") {
          navigate("/admin-dashboard");
        } else if (response.data.role == "Doctor") {
          navigate("/doctor-dashboard");
        } else if (response.data.role == "Nurse") {
          navigate("/nurse-dashboard");
        } else {
          navigate("/login-page");
        }
        // Redirect user to another page
        console.log("Login successful:", response.data);
      }
    } catch (error) {
      // Handle errors during login
      console.error("Error during login:", error);
      alert(error.response.data.error);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate('/')
  //   }
  // }, [user])

  return (
    <div className="login-container">
      <div className={`login-form ${isLoggedIn ? "logged-in" : ""}`}>
        <form onSubmit={handleLogin} className="login-body">
          <h1>Login</h1>
          <div className="input-box">
            <label className="username-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box" style={{ position:"relative" }} >
            <label className="password-label" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="login-form-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
