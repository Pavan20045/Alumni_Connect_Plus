// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   useEffect(() => {
//     const loggedIn = localStorage.getItem('isLoggedIn');
//     const storedUsername = localStorage.getItem('username');
//     if (loggedIn && storedUsername) {
//       navigate('/profile', { state: { username: storedUsername } });
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:4000/alumni/login', {
//         username,
//         password
//       });

//       setMessage(res.data.message);

//       if (res.data.message === "Login success") {
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('username', username);
//         navigate('/profile', { state: { username } });
//       }
//     } catch (err) {
//       if (err.response) {
//         setMessage(err.response.data.message);
//       } else {
//         setMessage('Error connecting to server');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Alumni Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// }

// export default Login;

// src/components/signin/Login.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ApiContext } from "../../App"; // ✅ Import centralized API

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const api = useContext(ApiContext); // ✅ Access centralized Axios instance

  // Redirect if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (loggedIn && storedUsername) {
      navigate("/profile", { state: { username: storedUsername } });
    }
  }, [navigate]);

  // ✅ Login using centralized API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      setMessage(res.data.message);

      if (res.data.message === "Login success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigate("/profile", { state: { username } });
      }
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error connecting to server");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Alumni Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
