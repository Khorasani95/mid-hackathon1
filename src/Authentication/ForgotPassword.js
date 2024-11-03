import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");

  // Handle email input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    console.log("Current email:", e.target.value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        const uid = user.uid;
        // Additional user info can be accessed here
      } else {
        console.log('User is signed out');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="bg-light p-4 rounded shadow" style={{ width: "400px" }}>
        <h4 className="text-center mb-4">Reset Your Password</h4>
        <form className="form" onSubmit={handleForgotPassword}>
          <div className="row mb-3 align-items-center">
            <label htmlFor="email" className="col-form-label col-sm-4">
              Email
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email} // Bind input value to email state
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
