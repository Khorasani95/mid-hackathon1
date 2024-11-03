import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = { fullName: "", email: "", password: "" };

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const everyInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let { fullName, email, password } = state;

    fullName = fullName.trim();
    email = email.trim();
    password = password.trim();

    if (fullName.length < 3) {
      return alert("Please enter your Full Name correctly", "error");
    }
    if (email.length < 3) {
      return alert("Please enter your Email correctly", "error");
    }
    // if (!window.isEmail(email)) {
    //   return alert('Please enter your Email correctly', 'error');
    // }
    if (password.length < 3) {
      return alert("Please enter your password correctly", "error");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User Registered Successfully");
        console.log("User registered:", state.password);
        navigate("/login");
      })
      .catch((error) => { 
        if (error.code === "auth/email-already-in-use") {
          alert(
            "This email is already registered. Please use a different email."
          );
        } else {
          console.error("Error:", error.code, error.message);
          alert("An error occurred. Please try again.");
        }

        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
      });
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Register</div>
          <div className="eula">
            By registering you agree to the terms that you didn’t read.
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.5"
                x2="307"
                y2="193.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: "#ff00ff" }} offset="0" />
                <stop style={{ stopColor: "#ff0000" }} offset="1" />
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <form className="form" onSubmit={handleFormSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={state.fullName}
              onChange={everyInputChange}
              className="form-control"
            />
            <label htmlFor="email">Email</label>
            <input
              className="input-underline form-control"
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={everyInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              className="input-underline form-control"
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={everyInputChange}
            />
            <button
              type="submit"
              id="submit"
              className="btn btn-danger rounded w-5 mb-5 shadow-lg text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
