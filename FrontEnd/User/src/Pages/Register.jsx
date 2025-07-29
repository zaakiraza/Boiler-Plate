import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !userName || !phone) {
      setMessage("Fields are missing");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        email: email,
        password: password,
        userName: userName,
        phone: phone,
      });

      if (res.data.status) {
        setMessage(res.data.message);
        localStorage.setItem("token", res.data.data.token);
        navigate("/VerifyOtp");
      }
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

  return (
    <div style={styles.loginForm}>
      <h1>Register Page</h1>
      <form style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="userName"
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"} // Show text if showPassword is true
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          ></i>
        </div>
        <input
          style={styles.input}
          type="number"
          placeholder="Phone Number"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </form>
      <button style={styles.button} onClick={handleRegister}>
        Register
      </button>
      <p style={styles.error}>{message}</p>
      <p style={styles.p}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;

const styles = {
  loginForm: {
    maxWidth: "25%",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    width: "92%",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
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
  p: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#777",
  },
  error: {
    color: "red",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: "0px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
};
