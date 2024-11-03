import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from 'react-router-dom';


const initialState = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState);

  const everyInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('User Logged In Successfully');
        console.log("User registered:", user);
        navigate('/home')
        
      })
      .catch((error) => {

        if (error.code === 'auth/email-already-in-use') {
          alert("This email is already registered. Please use a different email.");
        } else {
          console.error("Error:", error.code, error.message);
          alert("No User of this name.Register First.");
        };

        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User has been logged out');
        setState({}); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By registering you agree to the terms that you didn’t read.
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient id="linearGradient" x1="13" y1="193.5" x2="307" y2="193.5" gradientUnits="userSpaceOnUse">
                <stop style={{ stopColor: '#ff00ff' }} offset="0" />
                <stop style={{ stopColor: '#ff0000' }} offset="1" />
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <form className="form" onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={state.email} onChange={everyInputChange} />
            <label htmlFor="password">Password</label>
            <input type="password" className='input-underline' id="password" name="password" value={state.password} onChange={everyInputChange} />
            <button type="submit" id="submit" className="btn btn-danger text-white mb-3">Submit</button>
            <a className='d-block text-center text-decoration-none mb-2' href='/forgot'>Forgot Password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
