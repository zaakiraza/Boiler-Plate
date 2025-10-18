import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const nameByEmail = user?.email?.split("@")[0] || "";
  const getUser = async () => {
    const api = await axios.get("http://localhost:3001/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUser(api.data.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="dashboard-navbar simple">
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <h2 className="brand">MediCare</h2>
      </div>

      <nav className="nav-center">
        <ul>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
        </ul>
      </nav>

      <div className="nav-right">
        <div
          className="db-user"
          onClick={() => {
            navigate("/profile");
          }}
        >
          {user.profilePicture ? (
            // If profilePicture is a URL, show the image. Otherwise fallback to placeholder
            <img
              src={user.profilePicture}
              alt={user.userName || nameByEmail}
              className="profile-avatar"
              onError={(e) => {
                // If image fails to load, replace with placeholder
                e.target.onerror = null;
                e.target.style.display = "none";
                const parent = e.target.parentNode;
                const span = document.createElement("span");
                span.className = "placeholder-avatar";
                span.textContent = (nameByEmail.charAt(0) || "").toUpperCase();
                parent.insertBefore(span, e.target);
              }}
            />
          ) : (
            <span className="placeholder-avatar">
              {nameByEmail.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="username">{user.userName || nameByEmail}</span>
        </div>
        <div className="logout">
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
