import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/resetPassword">
        <button className="button">Change Password</button>
      </Link>
    </div>
  );
};

export default Settings;
