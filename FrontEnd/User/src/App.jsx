import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyOtp from "./Components/VerifyOtp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        {/* Public Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
