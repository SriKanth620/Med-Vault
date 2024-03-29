import React from "react";
import { Link } from "react-router-dom";
function RegisterPatient({ contract2, account, provider }) {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    // registerPatient(string memory _name,
    //      uint _mobile,
    //      address _user,
    //      string memory _role)
    let pname = document.getElementById("pname").value;
    let pmobile = document.getElementById("pmobile").value;
    let paddress = document.getElementById("paddress").value;
    // let prole="patient";
    // console.log(pname,pmobile,paddress,prole);
    try {
      await contract2
        .registerPatient(pname, pmobile, paddress)
        .then(() => {
          alert("Patient account created");
          window.setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alert(
            "Unable to create an account. Check the account:\nFor more info check console"
          );
          console.log(e.data.message);
        });
    } catch (e) {
      alert("Check account " + e);
    }
  };
  return (
    <div className="register">
      <h1>Create a patient account</h1>
      <form className="register-form" onSubmit={HandleSubmit}>
        <label className="patient">Patient Name</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Patient Name"
          id="pname"
        />

        <label className="patient">Mobile Number</label>
        <input
          className="admin-form-input"
          type="number"
          placeholder="Patient Mobile Number"
          id="pmobile"
        />

        <label className="patient"> Address</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Patient Address"
          id="paddress"
        />

        <input
          className="upload-btn"
          type="submit"
          name="submit"
          id="reg-btn"
        />
      </form>
      <Link className="admin-back" to="/admin">
        Back to Admin panel
      </Link>
    </div>
  );
}

export default RegisterPatient;
