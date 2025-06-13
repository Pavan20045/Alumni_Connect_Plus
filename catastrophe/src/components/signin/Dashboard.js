import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from './Users';
import './Dashboard.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDWogzqWht-9UimZ8y48chyV-sr2VKBJEE",
  authDomain: "alumniportal-9e858.firebaseapp.com",
  databaseURL: "https://alumniportal-9e858-default-rtdb.firebaseio.com",
  projectId: "alumniportal-9e858",
  storageBucket: "alumniportal-9e858.firebasestorage.app",
  messagingSenderId: "817158667343",
  appId: "1:817158667343:web:f9fdd78bd79654b113be3a",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Dashboard() {
  const navigate = useNavigate();
  const [hasEvents, setHasEvents] = useState(false);

  useEffect(() => {
    const eventsRef = ref(db, 'alumniPosts');
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const now = Date.now();
        const activeEvents = Object.values(data).some(event => !event.expiryDate || event.expiryDate > now);
        setHasEvents(activeEvents);
      } else {
        setHasEvents(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEventsClick = () => {
    navigate('/events');
  };

  return (
    <div className="dashboard-container">
      <p className="welcome-text">Welcome!</p>
      <p className="subtext">Explore the alumni records below.</p>

      <button
        className={`events-button ${hasEvents ? 'pulse' : ''}`}
        onClick={handleEventsClick}
      >
        Events
      </button>

      <div className="userlist-container">
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
