import React, { useEffect, useState } from "react";
import axios from "axios";
import { uploadToCloudinary } from "../../../utils/cloudinary";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUser(res.data.data.user || {});
      setUserName(res.data.data.user.userName || "");
      setFirstName(res.data.data.user.firstName || "");
      setLastName(res.data.data.user.lastName || "");
      setPhone(res.data.data.user.phone || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const { url } = await uploadToCloudinary(file);
      setUser((u) => ({ ...u, profilePicture: url }));
    } catch (err) {
      console.error(err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        profilePicture: user.profilePicture,
      };
      const res = await axios.put(
        "http://localhost:3001/api/users/update",
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data.data.user || user);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-grid">
          <div className="avatar-section">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="avatar"
                className="profile-img"
              />
            ) : (
              <div className="placeholder-avatar large">
                {(user.email || "").charAt(0).toUpperCase()}
              </div>
            )}

            <label className="upload-label">
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="info-section">
            <label>User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {error && <div className="error">{error}</div>}

            <div className="actions">
              <button className="btn" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
