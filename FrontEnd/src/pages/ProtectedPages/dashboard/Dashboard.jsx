import React, { useState, useEffect } from "react";
import axios from "axios";
import FamilyMemberCard from "../../../components/ProtectedComponents/FamilyMemberCard/FamilyMemberCard";
import FamilyMemberForm from "../../../components/FamilyMemberForm/FamilyMemberForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchFamilyMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:3001/api/family-members",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Get user's family members from the response
      const members = response.data.data.user.familyMembers || [];
      
      // Add color to members if they don't have one
      const membersWithColors = members.map(member => ({
        ...member,
        avatarColor: member.avatarColor || getRandomColor()
      }));
      
      setFamilyMembers(membersWithColors);
    } catch (error) {
      console.error("Error fetching family members:", error);
      setError("Failed to load family members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#20c997', '#339af0', '#ff4081', '#7950f2', '#ff922b'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (member) => {
    if (window.confirm("Are you sure you want to remove this family member?")) {
      try {
        await axios.delete(
          `http://localhost:3001/api/users/family-members/${member._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchFamilyMembers(); // Refresh the list
      } catch (error) {
        console.error("Error deleting family member:", error);
      }
    }
  };

  const handleOpenMember = (member) => {
    // Navigate to member details page
    window.location.href = `/family/${member._id}`;
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowForm(true);
  };

  const handleSaveMember = (member) => {
    fetchFamilyMembers(); // Refresh the list after save
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>HealthMate</h1>
        <button className="add-member-btn" onClick={handleAddMember}>
          + Add family member
        </button>
      </div>

      <p className="dashboard-subtitle">
        Tap a card to open that member's page. (We'll route this to /family/:id)
      </p>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchFamilyMembers} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading family members...</p>
        </div>
      ) : (
        <div className="family-members-grid">
          {familyMembers.length > 0 ? (
            <>
              {familyMembers.map((member) => (
                <FamilyMemberCard
                  key={member._id}
                  member={member}
                  onEdit={handleEditMember}
                  onDelete={handleDeleteMember}
                  onOpen={handleOpenMember}
                />
              ))}
            </>
          ) : (
            <p className="no-members">No family members added yet.</p>
          )}

          <button className="add-member-card" onClick={handleAddMember}>
            <span className="plus-icon">+</span>
            <span>Add family member</span>
            <span className="subtitle">Create a new card</span>
          </button>
        </div>
      )}

      {showForm && (
        <FamilyMemberForm
          onClose={() => setShowForm(false)}
          onSave={handleSaveMember}
          member={selectedMember}
          isEdit={!!selectedMember}
        />
      )}
    </div>
  );
};

export default Dashboard;
