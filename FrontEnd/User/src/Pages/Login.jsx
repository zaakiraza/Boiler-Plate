import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Fields are missing");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email: email,
        password: password,
      });
      if (!res.data.status) {
        setMessage(res.data.message);
        return;
      }
      localStorage.setItem("token", res.data.data);
      navigate("/Dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.loginForm}>
      <h1>Login Page</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
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
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} // Toggle between eye and eye-slash icons
            style={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          ></i>
        </div>
        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
      <p style={styles.error}>{message}</p>
      <p style={styles.p}>
        Didn't have an account? <Link to="/register">Register</Link>
      </p>
      {/* Forgot Password Link */}
      <p style={styles.forgotPassword}>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </p>
    </div>
  );
}

export default Login;

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
    width: "100%",
  },
  input: {
    width: "90%",
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
  forgotPassword: {
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "12px",
    color: "#007bff",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
};
