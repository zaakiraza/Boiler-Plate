import React from 'react';
import './FamilyMemberCard.css';

const FamilyMemberCard = ({ member, onEdit, onDelete, onOpen }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="family-member-card">
      <div className="card-header">
        <div className="avatar" style={{ backgroundColor: member.avatarColor }}>
          {member.name.charAt(0)}
        </div>
        <div className="member-info">
          <h3>{member.name}</h3>
          <p className="relationship">{member.relationship}</p>
        </div>
      </div>
      
      <div className="last-activity">
        Last activity
        <span>{formatDate(member.lastActivity)}</span>
      </div>

      <div className="card-actions">
        <button onClick={() => onEdit(member)} className="action-btn edit">
          <span className="icon">✏️</span>
          Edit
        </button>
        <button onClick={() => onDelete(member)} className="action-btn delete">
          <span className="icon">🗑️</span>
          Delete
        </button>
        <button onClick={() => onOpen(member)} className="action-btn open">
          Open
        </button>
      </div>
    </div>
  );
};

export default FamilyMemberCard;