import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import axios from 'axios';

function EditProfile() {
  const navigate = useNavigate();
  const { username } = useLocation().state || { username: 'User' };
  const [userData, setUserData] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/alumni/details?username=${username}`)
      .then(res => setUserData(res.data))
      .catch(err => alert(err.response?.data?.error || 'Error fetching user data'));
  }, [username]);

  const handleEditClick = (field) =>
    setEditableFields(prev => ({ ...prev, [field]: true }));

  const handleChange = (field, value) =>
    setUserData(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    axios.post('http://localhost:4000/alumni/update', userData)
      .then(() => {
        alert('Profile updated successfully');
        navigate('/profile', { state: { username } });
      })
      .catch(err => alert(err.response?.data?.error || 'Failed to update profile'));
  };

  const handleBack = () =>
    navigate('/profile', { state: { username } });

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="edit-profile-container">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h2>Edit Profile</h2>

      {/* Profile Photo Section */}
      <div className="profile-photo-container">
        <img
          src={userData.profilePhotoBase64 || 'https://via.placeholder.com/120'}
          alt="Profile"
          className="profile-photo"
        />
        <div className="edit-overlay" onClick={() => alert('Edit profile photo functionality coming soon')}>
          Edit
        </div>
      </div>

      {/* Editable Fields */}
      <div className="form-container">

        {/* Full Name */}
        <div className="form-row">
          <label>Full Name:</label>
          {editableFields.fullName ? (
            <input
              type="text"
              value={userData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          ) : (
            <span>{userData.name}</span>
          )}
          <button className="edit-button" onClick={() => handleEditClick('fullName')}>
            {editableFields.fullName ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Username - Non editable */}
        <div className="form-row">
          <label>UserName:</label>
          <span>{userData.username}</span>
        </div>

        {/* Area of Expertise */}
        <div className="form-row">
          <label>Area Of Expertise:</label>
          {editableFields.areaOfExpertise ? (
            <input
              type="text"
              value={userData.areaOfExpertise || ''}
              onChange={(e) => handleChange('areaOfExpertise', e.target.value)}
            />
          ) : (
            <span>{userData.areaOfExpertise}</span>
          )}
          <button className="edit-button" onClick={() => handleEditClick('areaOfExpertise')}>
            {editableFields.areaOfExpertise ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Date of Birth */}
        <div className="form-row">
          <label>Date Of Birth:</label>
          {editableFields.dob ? (
            <input
              type="date"
              value={userData.dob || ''}
              onChange={(e) => handleChange('dob', e.target.value)}
            />
          ) : (
            <span>{userData.dob}</span>
          )}
          <button className="edit-button" onClick={() => handleEditClick('dob')}>
            {editableFields.dob ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Gender - Non editable */}
        <div className="form-row">
          <label>Gender:</label>
          <span>{userData.gender}</span>
        </div>

        {/* Passout Year */}
        <div className="form-row">
          <label>Passout Year:</label>
          {editableFields.passoutYear ? (
            <input
              type="number"
              value={userData.passoutYear || ''}
              onChange={(e) => handleChange('passoutYear', e.target.value)}
            />
          ) : (
            <span>{userData.passoutYear}</span>
          )}
          <button className="edit-button" onClick={() => handleEditClick('passoutYear')}>
            {editableFields.passoutYear ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Professional Background */}
        <div className="form-row">
          <label>Professional Background:</label>
          {editableFields.professionalBackground ? (
            <input
              type="text"
              value={userData.professionalBackground || ''}
              onChange={(e) => handleChange('professionalBackground', e.target.value)}
            />
          ) : (
            <span>{userData.professionalBackground}</span>
          )}
          <button className="edit-button" onClick={() => handleEditClick('professionalBackground')}>
            {editableFields.professionalBackground ? 'Done' : 'Edit'}
          </button>
        </div>

        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
