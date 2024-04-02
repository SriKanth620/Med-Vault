import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import RegisterHospital from "./registration/RegisterHospital";
import RegisterDoctor from "./registration/RegisterDoctor";
import RegisterPatient from "./registration/RegisterPatient";

function Admin() {
  return (
    <div className="admin">
      <h1>Welcome Back Admin</h1>
      <div className="admin-links">
        <Link className="adminLink" to="/admin/regpatient">
          Register Patient
        </Link>{" "}
        <br />
        <Link className="adminLink" to="/admin/regdoctor">
          Register Doctor
        </Link>{" "}
        <br />
        <Link className="adminLink" to="/admin/reghospital">
          Register Hospital
        </Link>
      </div>
      <p>you the only way to register any entity</p>
    </div>
  );
}

export default Admin;
