import React, { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../../config/api";
import "./FamilyMemberForm.css";

const FamilyMemberForm = ({
  onClose,
  onSave,
  member = null,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    relationship: member?.relationship || "",
    dateOfBirth: member?.dateOfBirth
      ? new Date(member.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: member?.gender || "",
    bloodGroup: member?.bloodGroup || "",
    contactNumber: member?.contactNumber || "",
    emergencyContact: member?.emergencyContact || "",
    healthConditions: member?.healthConditions?.join(", ") || "",
    medications: member?.medications?.join(", ") || "",
    allergies: member?.allergies?.join(", ") || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert comma-separated strings to arrays
      const dataToSubmit = {
        name: formData.name,
        relationship: formData.relationship,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        contact: {
          phone: formData.contactNumber,
        },
        emergency: {
          primaryContact: {
            phone: formData.emergencyContact,
          },
        },
        medicalInfo: {
          healthConditions: formData.healthConditions
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          allergies: formData.allergies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          medications: formData.medications
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .map((med) => ({ name: med })),
        },
        avatarColor: member?.avatarColor || getRandomColor(),
        lastActivity: new Date(),
      };

      const token = localStorage.getItem("token");
      const url = isEdit
        ? `${API_CONFIG.BASE_URL}/family-members/${member._id}`
        : `${API_CONFIG.BASE_URL}/family-members`;

      const response = await axios({
        method: isEdit ? "PUT" : "POST",
        url,
        data: dataToSubmit,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data == 403) {
        Navigate("/signin");
      }

      onSave(response.data.data.familyMember);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save family member");
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#ff6b6b",
      "#20c997",
      "#339af0",
      "#ff4081",
      "#7950f2",
      "#ff922b",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="family-member-form-overlay">
      <div className="family-member-form">
        <h2>{isEdit ? "Edit" : "Add"} Family Member</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relationship">Relationship *</label>
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
              >
                <option value="">Select Relationship</option>
                <option value="spouse">Spouse</option>
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="healthConditions">
              Health Conditions (comma-separated)
            </label>
            <textarea
              id="healthConditions"
              name="healthConditions"
              value={formData.healthConditions}
              onChange={handleChange}
              placeholder="e.g., Diabetes, Hypertension"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="medications">
              Current Medications (comma-separated)
            </label>
            <textarea
              id="medications"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              placeholder="e.g., Metformin, Aspirin"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="allergies">Allergies (comma-separated)</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="e.g., Penicillin, Peanuts"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyMemberForm;
