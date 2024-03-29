import React from "react";
import { Link } from "react-router-dom";
function RegisterHospital({ contract2, account, provider }) {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    // registerHospital(string memory _name,
    //     uint _mobile,
    //      address _user,
    //     string memory _role) public onlyAdmin{
    let hname = document.getElementById("hname").value;
    let hmobile = document.getElementById("hmobile").value;
    let haddress = document.getElementById("haddress").value;
    // let hrole="hospital";
    // console.log(hname,hmobile,haddress,hrole);
    try {
      await contract2
        .registerHospital(hname, hmobile, haddress)
        .then(() => {
          alert("Hospital account created");
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
      alert("Check account " + e);
    }
  };
  return (
    <div className="register">
      <h1>Create a hospital account</h1>
      <form className="register-form" onSubmit={HandleSubmit}>
        <label className="patient">Hospital Name</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Hospital Name"
          id="hname"
        />
        <label className="patient">Hospital Number</label>
        <input
          className="admin-form-input"
          type="number"
          placeholder="Hospital Mobile Number"
          id="hmobile"
        />
        <label className="patient">Hospital Address</label>
        <input
          className="admin-form-input"
          type="text"
          placeholder="Hospital Address"
          id="haddress"
        />
        <input
          className="upload-btn"
          type="submit"
          name="submit"
          id="reg-btn"
        />
      </form>
      <Link to="/admin">Back to Admin panel</Link>
    </div>
  );
}

export default RegisterHospital;
