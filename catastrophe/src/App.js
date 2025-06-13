import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/signin/Register";
import Dashboard from "./components/signin/Dashboard";
import Login from "./components/signin/Login";
import Home from "./components/signin/Home";
import Navbar from "./components/signin/Navbars";
import Profile from "./components/signin/Profile";
import EditProfile from './components/signin/EditProfile';
import Events from "./components/signin/Events";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/Events" element={<Events />} />
      </Routes>
    </Router>
  );
}
