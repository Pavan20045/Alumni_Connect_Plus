// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Users from './Users';
// import './Dashboard.css';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyDWogzqWht-9UimZ8y48chyV-sr2VKBJEE",
//   authDomain: "alumniportal-9e858.firebaseapp.com",
//   databaseURL: "https://alumniportal-9e858-default-rtdb.firebaseio.com",
//   projectId: "alumniportal-9e858",
//   storageBucket: "alumniportal-9e858.firebasestorage.app",
//   messagingSenderId: "817158667343",
//   appId: "1:817158667343:web:f9fdd78bd79654b113be3a",
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// function Dashboard() {
//   const navigate = useNavigate();
//   const [hasEvents, setHasEvents] = useState(false);

//   useEffect(() => {
//     const eventsRef = ref(db, 'alumniPosts');
//     const unsubscribe = onValue(eventsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const now = Date.now();
//         const activeEvents = Object.values(data).some(event => !event.expiryDate || event.expiryDate > now);
//         setHasEvents(activeEvents);
//       } else {
//         setHasEvents(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleEventsClick = () => {
//     navigate('/events');
//   };

//   return (
//     <div className="dashboard-container">
//       <p className="welcome-text">Welcome!</p>
//       <p className="subtext">Explore the alumni records below.</p>

//       <button
//         className={`events-button ${hasEvents ? 'pulse' : ''}`}
//         onClick={handleEventsClick}
//       >
//         Events
//       </button>

//       <div className="userlist-container">
//         <Users />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// src/components/signin/Dashboard.js
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
import "./Dashboard.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { ApiContext } from "../../App"; // import centralized API

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWogzqWht-9UimZ8y48chyV-sr2VKBJEE",
  authDomain: "alumniportal-9e858.firebaseapp.com",
  databaseURL: "https://alumniportal-9e858-default-rtdb.firebaseio.com",
  projectId: "alumniportal-9e858",
  storageBucket: "alumniportal-9e858.firebasestorage.app",
  messagingSenderId: "817158667343",
  appId: "1:817158667343:web:f9fdd78bd79654b113be3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Dashboard() {
  const navigate = useNavigate();
  const api = useContext(ApiContext); // access centralized API
  const [hasEvents, setHasEvents] = useState(false);
  const [alumniData, setAlumniData] = useState([]);

  // ✅ 1. Fetch active events from Firebase
  useEffect(() => {
    const eventsRef = ref(db, "alumniPosts");
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const now = Date.now();
        const activeEvents = Object.values(data).some(
          (event) => !event.expiryDate || event.expiryDate > now
        );
        setHasEvents(activeEvents);
      } else {
        setHasEvents(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ 2. Example: Fetch alumni records via centralized API
  useEffect(() => {
    api
      .get("/alumni") // change endpoint as per your backend route
      .then((res) => setAlumniData(res.data))
      .catch((err) => console.error("Error fetching alumni data:", err));
  }, [api]);

  // ✅ 3. Navigation for Events button
  const handleEventsClick = () => {
    navigate("/events");
  };

  return (
    <div className="dashboard-container">
      <p className="welcome-text">Welcome!</p>
      <p className="subtext">Explore the alumni records below.</p>

      <button
        className={`events-button ${hasEvents ? "pulse" : ""}`}
        onClick={handleEventsClick}
      >
        Events
      </button>

      <div className="userlist-container">
        {/* Example usage of fetched alumni data */}
        <Users alumniData={alumniData} />
      </div>
    </div>
  );
}

export default Dashboard;
