import React from "react";
import Lottie from "lottie-react";
import adminAnimation from "./assets/admin.json";
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
      <h2>Admin Responsibilities</h2>
      <h3>only admin can register entity into the system</h3>
      <div className="admin-res-container">
        <ul className="admin-info">
          <li>
            Verify credentials: Authenticate licenses, IDs, and accreditations
            thoroughly.
          </li>
          <li>
            Register users: Input verified data accurately, assigning unique
            IDs.
          </li>
          <li>
            Maintain confidentiality: Prioritize user data privacy rigorously.
          </li>
          <li>
            Provide support: Offer responsive assistance throughout
            registration.
          </li>
          <li>
            Keep info updated: Maintain accuracy of user data consistently.
          </li>
          <li>Ensure compliance: Adhere strictly to relevant regulations.</li>
          <li>
            Collaborate with stakeholders: Foster productive partnerships.
          </li>
          <li>
            Implement security: Establish robust measures for data protection.
          </li>
        </ul>
        <Lottie className="admin-animation" animationData={adminAnimation} />
      </div>
    </div>
  );
}

export default Admin;
