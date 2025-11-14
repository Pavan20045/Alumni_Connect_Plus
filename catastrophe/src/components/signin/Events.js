// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Events.css';

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null); // ✅ moved here

//   useEffect(() => {
//     axios
//       .get('https://alumniportal-9e858-default-rtdb.firebaseio.com/alumniPosts.json')
//       .then((res) => {
//         const data = res.data;
//         if (data) {
//           const parsedEvents = Object.entries(data)
//             .map(([id, event]) => ({ id, ...event }))
//             .filter(event => !event.expiryDate || Date.now() < event.expiryDate)
//             .sort((a, b) => {
//               const now = Date.now();
//               const aExpiry = a.expiryDate ?? Number.MAX_SAFE_INTEGER;
//               const bExpiry = b.expiryDate ?? Number.MAX_SAFE_INTEGER;
//               return (aExpiry - now) - (bExpiry - now);
//             });

//           setEvents(parsedEvents);
//         } else {
//           setEvents([]);
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to load events:', err);
//         setEvents([]);
//       });
//   }, []);

//   if (!events.length) {
//     return (
//       <div className="no-events">
//         <h1><b>No Active Events Yet</b></h1>
//       </div>
//     );
//   }

//   return (
//     <div className="events-container">
//       <h2>Alumni Events Timeline</h2>
//       {events.map((event, index) => (
//         <div className="event-card" key={event.id}>
//           <div className="event-number">#{index + 1}</div>
//           <div className="event-content">
//             {event.image && (
//               <img
//                 src={event.image.startsWith('data:') ? event.image : `data:image/jpeg;base64,${event.image}`}
//                 alt={`Event ${index + 1}`}
//                 className="event-image"
//                 style={{
//                   width: '150px',
//                   height: '150px',
//                   objectFit: 'cover',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() =>
//                   setSelectedImage(event.image.startsWith('data:') ? event.image : `data:image/jpeg;base64,${event.image}`)
//                 }
//               />
//             )}
//             <div className="event-text">
//               <p>{event.text}</p>
//               <small>Posted by: {event.username}</small><br />
//               {event.expiryDate && (
//                 <small>Expires on: {new Date(event.expiryDate).toLocaleString()}</small>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Fullscreen image modal */}
//       {selectedImage && (
//         <div className="fullscreen-overlay" onClick={() => setSelectedImage(null)}>
//           <img src={selectedImage} alt="Full View" className="fullscreen-image" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Events;

// src/components/signin/Events.js
import React, { useEffect, useState, useContext } from "react";
import "./Events.css";
import axios from "axios"; // keep axios for Firebase read
import { ApiContext } from "../../App"; // ✅ centralized API (for future backend use)

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const api = useContext(ApiContext); // ✅ access global API instance (future-ready)

  useEffect(() => {
    // 🔹 Using direct Firebase REST API since it's a Realtime DB
    axios
      .get("https://alumniportal-9e858-default-rtdb.firebaseio.com/alumniPosts.json")
      .then((res) => {
        const data = res.data;
        if (data) {
          const parsedEvents = Object.entries(data)
            .map(([id, event]) => ({ id, ...event }))
            .filter((event) => !event.expiryDate || Date.now() < event.expiryDate)
            .sort((a, b) => {
              const now = Date.now();
              const aExpiry = a.expiryDate ?? Number.MAX_SAFE_INTEGER;
              const bExpiry = b.expiryDate ?? Number.MAX_SAFE_INTEGER;
              return (aExpiry - now) - (bExpiry - now);
            });

          setEvents(parsedEvents);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
        setEvents([]);
      });
  }, [api]); // include api for consistency, though not used directly yet

  if (!events.length) {
    return (
      <div className="no-events">
        <h1><b>No Active Events Yet</b></h1>
      </div>
    );
  }

  return (
    <div className="events-container">
      <h2>Alumni Events Timeline</h2>
      {events.map((event, index) => (
        <div className="event-card" key={event.id}>
          <div className="event-number">#{index + 1}</div>
          <div className="event-content">
            {event.image && (
              <img
                src={
                  event.image.startsWith("data:")
                    ? event.image
                    : `data:image/jpeg;base64,${event.image}`
                }
                alt={`Event ${index + 1}`}
                className="event-image"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedImage(
                    event.image.startsWith("data:")
                      ? event.image
                      : `data:image/jpeg;base64,${event.image}`
                  )
                }
              />
            )}
            <div className="event-text">
              <p>{event.text}</p>
              <small>Posted by: {event.username}</small>
              <br />
              {event.expiryDate && (
                <small>
                  Expires on:{" "}
                  {new Date(event.expiryDate).toLocaleString()}
                </small>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Fullscreen image modal */}
      {selectedImage && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="fullscreen-image"
          />
        </div>
      )}
    </div>
  );
}

export default Events;
