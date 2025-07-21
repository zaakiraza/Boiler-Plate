import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent

  const handleOtpRequest = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/send-otp", // Replace with actual endpoint to send OTP
        { email }
      );
      setMessage(response.data.message);
      setIsOtpSent(true); // OTP is successfully sent
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleResetRequest = async () => {
    if (!email || !otp) {
      setMessage("Fields are missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/verify-otp", // Replace with actual endpoint for OTP verification
        { email, otp }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to verify OTP.");
    }
  };

  return (
    <div style={styles.forgotPasswordForm}>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <div style={styles.otpWrapper}>
        <input
          type="number"
          maxLength={4}
          minLength={4}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input1}
        />
        <button
          style={styles.otpButton}
          onClick={handleOtpRequest}
          disabled={isOtpSent} // Disable button after OTP is sent
        >
          {isOtpSent ? "OTP Sent" : "Send OTP"}
        </button>
      </div>
      <button style={styles.button} onClick={handleResetRequest}>
        Request Password Reset
      </button>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  forgotPasswordForm: {
    maxWidth: "30%",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "94%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  input1: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  otpWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  otpButton: {
    padding: "10px 15px",
    backgroundColor: "#008a7c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
    width: "8%",
    position:"absolute",
    right:"35%"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#008a7c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  message: {
    marginTop: "10px",
    color: "red",
  },
};

export default ForgotPassword;
