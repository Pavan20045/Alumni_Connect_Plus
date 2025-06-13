import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigationcomp.css';

function Navbars() {
  return (
    <nav className="navbar-wrapper d-flex justify-content-between align-items-center px-4 py-2">
      <div className="brand">
        <h2 className="m-0"><i>Connect Plus</i></h2>
      </div>
      <ul className="nav m-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="Login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbars;
