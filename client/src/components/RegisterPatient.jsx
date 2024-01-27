import React from 'react'

function RegisterPatient({ contract, account, provider }) {
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
        let prole="patient";
        // console.log(pname,pmobile,paddress,prole);
        try{
            await contract.registerPatient(pname,pmobile,paddress,prole).then(()=>{
                alert("Patient account created")
            })
            .catch((e)=>{
                alert("Unable to create an account. Check the account ")
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
    </div>
  )
}

export default RegisterPatient