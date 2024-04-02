import React, { useEffect, useState } from "react";
import "./../../App.css"; // Import the CSS file for styling
import { FaInfoCircle } from "react-icons/fa";

function EmergencyPortalPatient({ contract2, account }) {
  const [accessInfo, setAccessInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyAccessInfo = async () => {
      setLoading(true);
      try {
        const emergencies = await contract2.getAllEmergencies();
        setAccessInfo(emergencies);
      } catch (err) {
        setError(err.message || err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    contract2 && fetchEmergencyAccessInfo();
  }, [contract2, account]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="emergency-container">
      <h1 className="title">Emergency Access Portal</h1>
      <div className="good-container">
        <FaInfoCircle className="info-icon" />
        <p className="info">
          This portal displays all emergency accesses made by doctors. We
          prioritize transparency to build a patient-centric community on our
          blockchain platform. All emergency access details are publicly visible
          to enhance trust and accountability.
        </p>
      </div>
      <p className="instruction">
        To view emergency access details, simply scroll through the table below
        or use the search and filter options to find specific records.
      </p>
      <h2 className="subtitle">Emergency Access Log</h2>
      <table className="emergency-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Doctor Mobile</th>
            <th className="address-column">Doctor Address</th>
            <th>Hospital Name</th>
            <th className="address-column">Hospital Address</th>
            <th>Patient Name</th>
            <th className="address-column">Patient Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {accessInfo.map((emergency, index) => (
            <tr key={index}>
              <td>{emergency.doctorName}</td>
              <td>{emergency.doctorMobile}</td>
              <td className="address-column">{emergency.doctorAddress}</td>
              <td>{emergency.hospitalName}</td>
              <td className="address-column">{emergency.hospitalAddress}</td>
              <td>{emergency.patientName}</td>
              <td className="address-column">{emergency.patientAddress}</td>
              <td>{new Date(emergency.date * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="cta-button">
        <a href="#top">Back to Top</a>
      </button>
    </div>
  );
}

export default EmergencyPortalPatient;
