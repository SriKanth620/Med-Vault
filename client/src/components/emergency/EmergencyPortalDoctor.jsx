import React, { useEffect, useState } from "react";
import Display from "../Display";
import EmergencyRecordDisplay from "./EmergencyRecordDisplay";
import "./../../App.css"; // Import the CSS file for styling

function EmergencyPortalDoctor({ contract1, contract2, account, provider }) {
  const [patientInfo, setPatientInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const DisplayPatient = async () => {
      try {
        await contract2.checkDoctor(account);
        const patients = await contract2.displayPatient();
        if (isMounted) {
          setPatientInfo(patients);
          console.log(patients);
        }
      } catch (err) {
        alert(err);
      }
    };

    contract2 && DisplayPatient();

    return () => {
      isMounted = false;
    };
  }, [contract2, account]);

  const handleCopyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      alert("Address copied to clipboard!");
    } catch (err) {
      alert("Failed to copy address to clipboard.");
    }
  };

  const filteredPatients = patientInfo.filter(
    (patient) =>
      patient.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchQuery.toLowerCase().replace(/\s+/g, "")) ||
      patient.mobile
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchQuery.toLowerCase().replace(/\s+/g, ""))
  );

  return (
    <div className="container">
      <h1 className="header">Welcome to Emergency Portal</h1>
      <div className="warning-container">
        <p className="warning-text">
          ⚠️ <strong>Warning:</strong> This portal is strictly for emergency
          purposes and is intended for use by authorized doctors only.
          Unauthorized access to patient records is illegal and may result in
          severe consequences, including imprisonment.
        </p>
        <div className="warning-instruction">
          📜 <strong>Instructions:</strong>
          <ul>
            <li>Only authorized doctors can access this portal.</li>
            <li>
              Ensure you have proper consent and authorization before accessing
              patient records.
            </li>
            <li>
              Patient records accessed through this portal are stored on the
              blockchain and can be viewed by the patient.
            </li>
            <li>
              Notify the patient immediately after accessing their records
              through this portal.
            </li>
            <li>
              Any misuse or unauthorized access will be traced and can result in
              legal actions.
            </li>
          </ul>
        </div>
      </div>
      <h2 className="header">Emergency Portal for Doctors</h2>
      <input
        type="text"
        placeholder="Search by Patient Name or Mobile"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />
      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Copy Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.mobile}</td>
                <td>{patient.account}</td>
                <td>
                  <button
                    onClick={() => handleCopyAddress(patient.account)}
                    className="copy-button"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
      <EmergencyRecordDisplay
        account={account}
        provider={provider}
        contract1={contract1}
        contract2={contract2}
      ></EmergencyRecordDisplay>
    </div>
  );
}

export default EmergencyPortalDoctor;

// import React, { useEffect } from "react";
// import Display from "../Display";
// import EmergencyRecordDisplay from "./EmergencyRecordDisplay";

// function EmergencyPortalDoctor({ contract1, contract2, account, provider }) {
//   let patientInfo;
//   useEffect(() => {
//     const DisplayPatient = async () => {
//       try {
//         await contract2.checkDoctor(account);
//         patientInfo = await contract2.displayPatient();
//         console.log(patientInfo);
//       } catch (err) {
//         alert(err);
//       }
//     };
//     contract2 && DisplayPatient();
//   }, [contract2, account]);
//   return (
//     <div>
//       Emergency
//       <EmergencyRecordDisplay
//         account={account}
//         provider={provider}
//         contract1={contract1}
//         contract2={contract2}
//       ></EmergencyRecordDisplay>
//     </div>
//   );
// }

// export default EmergencyPortalDoctor;
