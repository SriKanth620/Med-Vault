import React from 'react'
import { Link } from 'react-router-dom';
function RegisterPatient({ contract2, account, provider }) {
    const HandleSubmit= async(e)=>{
        e.preventDefault();
        console.log(account);
        // registerPatient(string memory _name,
        //      uint _mobile, 
        //      address _user, 
        //      string memory _role)
        let pname= document.getElementById("pname").value;
        let pmobile= document.getElementById("pmobile").value;
        let paddress= document.getElementById("paddress").value;
        // let prole="patient";
        // console.log(pname,pmobile,paddress,prole);
        try{
            await contract2.registerPatient(pname,pmobile,paddress).then(()=>{
                alert("Patient account created")
            })
            .catch((e)=>{
                alert("Unable to create an account. Check the account:\nFor more info check console"  )
                console.log(e.data.message);
            })
        }
        catch(e){
            alert("Check account "+ e);
        }
        
    }
  return (
    <div>
        
        <h1>Create a patient account</h1>
        <form onSubmit={HandleSubmit}>
            <input type="text" placeholder='Patient Name' id="pname"/>
             <br />
            <input type='number' placeholder='Patient Mobile Number'id="pmobile"/>
            <br />
            <input type="text" placeholder='Patient Address'id="paddress"/>
            <br />
            <br />
            <input type="submit" name="submit" id="reg-btn" />
        </form>
        <Link to="/admin">Back to Admin panel</Link>
    </div>
  )
}

export default RegisterPatient;