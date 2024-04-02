import React, { useState } from "react";
import "./../../App.css"; // Import the CSS file for styling

function EmergencyRecordDisplay({ contract1, contract2, account, provider }) {
  const [data, setData] = useState("");

  const handleEmergencySubmit = async (e) => {
    e.preventDefault();

    let patientData;
    const patientAccount = document.getElementById("patient-account").value;

    try {
      await contract2.checkPatient(patientAccount);
      await contract2.checkDoctor(account);
      await contract2.emergencyAccessToPatient(patientAccount);

      patientData = await contract2.displayEmergency(patientAccount);
      console.log(patientData);
    } catch (err) {
      alert("Check the Account");
      console.log(err);
    }

    const isEmpty = Object.keys(patientData).length === 0;

    if (!isEmpty) {
      const str = patientData.toString();
      const strArray = str.split(",");
      const images = strArray.map((item, i) => (
        <a href={item} key={i} target="_blank" rel="noopener noreferrer">
          <img key={i} src={item} alt="emergency" className="image-list"></img>
        </a>
      ));
      setData(images);
    } else {
      alert("No Records to display");
    }
  };

  return (
    <div className="emergency-record-container">
      <h3>Access Emergency Records</h3>
      <form onSubmit={handleEmergencySubmit}>
        <input
          type="text"
          id="patient-account"
          placeholder="Patient Address"
          required
          className="emergency-input"
        />
        <input
          type="submit"
          value="Emergency Access"
          className="emergency-button"
        />
      </form>
      <div className="image-list">{data}</div>
    </div>
  );
}

export default EmergencyRecordDisplay;

// import React, { useState } from "react";

// function EmergencyRecordDisplay({ contract1, contract2, account, provider }) {
//   const [data, setData] = useState("");
//   const HandleEmergencySubmit = async (e) => {
//     e.preventDefault();

//     let patientdata;
//     const patientAccount = document.getElementById("patient-account").value;
//     try {
//       await contract2.checkPatient(patientAccount);
//       //   .catch((err) => {
//       //   alert("Enter valid patient account");
//       // });
//       await contract2.checkDoctor(account);
//       //   .catch((e) => {
//       //     alert("You don't have an doctor account");
//       //     console.log(e);
//       //   });
//       await contract2
//         .emergencyAccessToPatient(patientAccount)
//         .then(() => {
//           console.log("emergencyAccessToPatient function working");
//         })
//         .catch((err) => {});
//       patientdata = await contract2.displayEmergency(patientAccount);
//       console.log("displayEmergency function working");
//       console.log(patientdata);
//     } catch (err) {
//       alert("Check the Account");
//       console.log(err);
//     }
//     const isEmpty = Object.keys(patientdata).length === 0;

//     if (!isEmpty) {
//       const str = patientdata.toString();
//       const str_array = str.split(",");
//       // console.log(str);
//       // console.log(str_array);
//       const images = str_array.map((item, i) => {
//         console.log(item);
//         return (
//           <a href={item} key={i} target="_blank">
//             <img key={i} src={item} alt="new" className="image-list"></img>
//           </a>
//         );
//       });
//       setData(images);
//     } else {
//       alert("No Records to display");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={HandleEmergencySubmit}>
//         <input
//           type="text"
//           id="patient-account"
//           placeholder="Patient Address"
//           required
//         />
//         <input type="submit" value="Emergency Access" />
//       </form>
//       <div className="image-list">{data}</div>
//     </div>
//   );
// }

// export default EmergencyRecordDisplay;
