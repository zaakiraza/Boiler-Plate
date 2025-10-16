import { useNavigate } from "react-router-dom";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ user = { name: "John Doe", avatar: null } }) => {
  const navigate = useNavigate();

  return (
    <header className="dashboard-navbar simple">
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <h2 className="brand">Hackathon</h2>
      </div>

      <nav className="nav-center">
        <ul>
          <li onClick={() => navigate("/dashboard")}>Overview</li>
          <li onClick={() => navigate("/analytics")}>Analytics</li>
          <li onClick={() => navigate("/projects")}>Projects</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
        </ul>
      </nav>

      <div className="nav-right">
        <div className="db-user">
          <img
            className="avatar"
            src={user.avatar || "/logo192.png"}
            alt="avatar"
          />
          <span className="username">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
