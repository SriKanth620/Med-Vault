import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./App.css";

const Navbar = () => {
  return (
    <nav>
      {/* <h1 className="logo">MedVault</h1> */}
      <Link to="/">
        <h1 className="logo">MedVault</h1>
      </Link>
      <ul className="nav-bar-list">
        <li>
          <Link to="/doctor">Doctor</Link>
        </li>
        <li>
          <Link to="/patient">Patient</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
