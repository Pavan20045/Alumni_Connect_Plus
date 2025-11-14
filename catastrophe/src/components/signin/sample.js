// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UserList() {
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Define a function to fetch filtered users
//     const fetchFilteredUsers = async () => {
//       try {
//         // Make a GET request to the backend endpoint
//         const response = await axios.get('http://localhost:4000/alumni/get_user/VNRVJIET');
//         // Set the filtered users in the state
//         setFilteredUsers(response.data.payload);
//         setLoading(false);
//       } catch (error) {
//         // Handle errors
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     // Call the function to fetch filtered users when the component mounts
//     fetchFilteredUsers();
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   // Render loading message while data is being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Render error message if an error occurred
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render the list of filtered users
//   return (
//     <div>
//       <h2>Filtered Users</h2>
//       <ul>
//         {filteredUsers.map(user => (
//           <li key={user._id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserList;

// src/components/signin/UserList.js
import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "../../App"; // ✅ Import centralized API

function UserList() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = useContext(ApiContext); // ✅ Access shared Axios instance

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        // ✅ Using centralized API instead of hardcoded URL
        const response = await api.get("/alumni/get_user/VNRVJIET");
        setFilteredUsers(response.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredUsers();
  }, [api]); // ✅ Added api as dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Filtered Users</h2>
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
