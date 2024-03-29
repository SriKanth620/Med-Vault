import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function RegisterDoctor({ contract2, account, provider }) {
  let hospitals;
  let data = [];
  // const [hospitalList, setHospitalList] = useState([]);
  useEffect(() => {
    const FetchHospitals = async () => {
      try {
        hospitals = await contract2.displayHospital();
        alert("Hospitals fetched");
        let select = document.getElementById("hospital list");
        for (let i = 0; i < hospitals.length; i++) {
          let opt = hospitals[i].name + " , " + hospitals[i].account;
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = hospitals[i].account;
          select.appendChild(e1);
        }
      } catch (e) {
        alert("Unable to fetch hospitals, Create hospitals");
        console.log(e);
      }
    };
    contract2 && FetchHospitals();
  }, [contract2]);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    // registerPatient(string memory _name,
    //      uint _mobile,
    //      address _user,
    //      string memory _role)
    let dname = document.getElementById("dname").value;
    let dmobile = document.getElementById("dmobile").value;
    let daddress = document.getElementById("daddress").value;
    let ddesg = document.getElementById("ddesg").value;
    let hdaddress = document.getElementById("hospital list").value;
    // let drole="doctor";
    console.log(dname, dmobile, daddress, ddesg, hdaddress);
    try {
      await contract2
        .registerDoctor(dname, dmobile, daddress, ddesg, hdaddress)
        .then(() => {
          alert("Doctor account created");
          window.setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alert(
            "Unable to create an account. Check the account\nFor more info check console "
          );
          console.log(e.data.message);
        });
    } catch (e) {
      alert("Check account. Error: " + e);
      console.log(e);
    }
  };
  return (
    <div className="register">
      <h1>Create a doctor account</h1>
      <form className="register-form" onSubmit={HandleSubmit}>
        <label className="patient">Doctor Name</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Doctor Name"
          id="dname"
        />
        <label className="patient">Mobile Number</label>
        <input
          className="admin-form-input"
          type="number"
          placeholder="Doctor Mobile Number"
          id="dmobile"
        />
        <label className="patient">Address</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Doctor Address"
          id="daddress"
        />
        <label className="patient">Specialization</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Doctor Specialization"
          id="ddesg"
        />
        <label className="patient" htmlFor="hospital list">
          Select hospital:{" "}
        </label>
        <select className="admin-form-input" name="hospital-list" id="hospital list"></select>
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

export default RegisterDoctor;
