import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-wrapper">
      <Link to="/resetPassword">
        <button className="change-password-button">Change Password</button>
      </Link>
    </div>
  );
};

export default Settings;
