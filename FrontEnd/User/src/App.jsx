import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyOtp from "./Pages/VerifyOtp";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import PublicRoute from "./Components/PublicRoutes/PublicRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<PublicRoute element={<Register />} />}
        />
        <Route
          path="/forgotPassword"
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route
          path="/verifyOtp"
          element={<PublicRoute element={<VerifyOtp />} />}
        />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
