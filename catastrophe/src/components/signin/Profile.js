// import React, { useState, useEffect } from 'react';
// import './Profile.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaPaperclip, FaTimesCircle } from 'react-icons/fa';
// import axios from 'axios';

// function Profile() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [expiryDateTime, setExpiryDateTime] = useState('');
//   const username = location.state?.username || localStorage.getItem('username');

//   const [file, setFile] = useState(null);
//   const [announcement, setAnnouncement] = useState('');

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (!isLoggedIn || !username) {
//       navigate('/login');
//     }
//   }, [navigate, username]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.size > 512 * 1024) {
//       alert('File size must be 512 KB or less.');
//       e.target.value = null;
//     } else {
//       setFile(selectedFile);
//     }
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//     document.getElementById('fileInput').value = null;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     alert('Logged out successfully');
//     navigate('/');
//   };

//   const handleEditProfile = () => {
//     navigate('/edit-profile', { state: { username } });
//   };

//   const handlePost = async () => {
//     if (!announcement && !file) {
//       alert('Please enter a message or attach a file');
//       return;
//     }
//     if (!expiryDateTime) {
//         alert('Please set an expiry date and time.');
//         return;
//       }


//     const formData = new FormData();
//     formData.append('username', username);
//     formData.append('text', announcement);
//     formData.append('expiryDate', new Date(expiryDateTime).getTime()); // store as timestamp
//     if (file) formData.append('image', file);

//     try {
//       await axios.post('http://localhost:4000/alumni/post-event', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('Event posted successfully');
//       setAnnouncement('');
//       setFile(null);
//       document.getElementById('fileInput').value = null;
//     } catch (err) {
//       console.error(err);
//       alert('Failed to post event');
//     }
//   };

//   return (
//     <div className="profile-container">
//       <nav className="navbar">
//         <div className="navbar-left">Hi, {username}</div>
//         <div className="navbar-right">
//           <button className="edit-button" onClick={handleEditProfile}>Edit Profile</button>
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>

//       <main className="main-content">
//         <div className="box notifications">
//           <h3>Notifications</h3>
//           <p>You have 0 new notifications.</p>
//         </div>

//         <div className="box announcement">
//           <h3>Post New Announcement</h3>
//           <textarea
//             placeholder="Write your announcement here..."
//             rows="4"
//             value={announcement}
//             onChange={(e) => setAnnouncement(e.target.value)}
//           />
//           <label htmlFor="expiryDateTime" className="expiry-label">Set Expiry Date & Time:</label>
//           <input
//             type="datetime-local"
//             id="expiryDateTime"
//             className="expiry-input"
//             value={expiryDateTime}
//             onChange={(e) => setExpiryDateTime(e.target.value)}
//             required
//           />

//           <input
//             type="file"
//             id="fileInput"
//             className="hidden-file-input"
//             onChange={handleFileChange}
//           />

//           <label htmlFor="fileInput" className="clip-icon" title="Attach a file">
//             <FaPaperclip />
//           </label>

//           {file && (
//             <div className="attached-file">
//               {file.name}
//               <FaTimesCircle className="remove-file-icon" onClick={handleRemoveFile} title="Remove file" />
//             </div>
//           )}

//           <button className="post-button" onClick={handlePost}>Post</button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Profile;

// src/components/signin/Profile.js
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPaperclip, FaTimesCircle } from "react-icons/fa";
import "./Profile.css";
import { ApiContext } from "../../App"; // ✅ Import centralized API

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const api = useContext(ApiContext); // ✅ Use centralized Axios instance

  const [expiryDateTime, setExpiryDateTime] = useState("");
  const [file, setFile] = useState(null);
  const [announcement, setAnnouncement] = useState("");

  const username = location.state?.username || localStorage.getItem("username");

  // ✅ Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || !username) {
      navigate("/login");
    }
  }, [navigate, username]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 512 * 1024) {
      alert("File size must be 512 KB or less.");
      e.target.value = null;
    } else {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById("fileInput").value = null;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile", { state: { username } });
  };

  // ✅ Use centralized API for event posting
  const handlePost = async () => {
    if (!announcement && !file) {
      alert("Please enter a message or attach a file");
      return;
    }
    if (!expiryDateTime) {
      alert("Please set an expiry date and time.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("text", announcement);
    formData.append("expiryDate", new Date(expiryDateTime).getTime());
    if (file) formData.append("image", file);

    try {
      await api.post("/alumni/post-event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event posted successfully");
      setAnnouncement("");
      setFile(null);
      document.getElementById("fileInput").value = null;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to post event");
    }
  };

  return (
    <div className="profile-container">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">Hi, {username}</div>
        <div className="navbar-right">
          <button className="edit-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="main-content">
        {/* Notifications */}
        <div className="box notifications">
          <h3>Notifications</h3>
          <p>You have 0 new notifications.</p>
        </div>

        {/* Post Announcement Section */}
        <div className="box announcement">
          <h3>Post New Announcement</h3>
          <textarea
            placeholder="Write your announcement here..."
            rows="4"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />

          <label htmlFor="expiryDateTime" className="expiry-label">
            Set Expiry Date & Time:
          </label>
          <input
            type="datetime-local"
            id="expiryDateTime"
            className="expiry-input"
            value={expiryDateTime}
            onChange={(e) => setExpiryDateTime(e.target.value)}
            required
          />

          <input
            type="file"
            id="fileInput"
            className="hidden-file-input"
            onChange={handleFileChange}
          />

          <label htmlFor="fileInput" className="clip-icon" title="Attach a file">
            <FaPaperclip />
          </label>

          {file && (
            <div className="attached-file">
              {file.name}
              <FaTimesCircle
                className="remove-file-icon"
                onClick={handleRemoveFile}
                title="Remove file"
              />
            </div>
          )}

          <button className="post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
