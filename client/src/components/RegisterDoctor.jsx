import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
function RegisterDoctor({ contract2, account, provider }) {
    let hospitals;
    let data=[];
    // const [hospitalList, setHospitalList] = useState([]);
    useEffect(()=>{
        const FetchHospitals= async()=>{
            try{
                 hospitals = await contract2.displayHospital();
                    alert("Hospitals fetched");
                    let select= document.getElementById("hospital list");
                    for(let i=0; i<hospitals.length;i++){
                        let opt = hospitals[i].name+" , "+hospitals[i].account;
                        let e1 = document.createElement("option");
                        e1.textContent = opt;
                        e1.value = hospitals[i].account;
                        select.appendChild(e1);

                    }
                   
            }
            catch(e){
                alert("unable to fetch hospitals, "+e);
            }

            
        };
    contract2 && FetchHospitals();
    },[contract2])
    const HandleSubmit= async(e)=>{
        e.preventDefault();
        console.log(account);
        // registerPatient(string memory _name,
        //      uint _mobile, 
        //      address _user, 
        //      string memory _role)
        let dname= document.getElementById("dname").value;
        let dmobile= document.getElementById("dmobile").value;
        let daddress= document.getElementById("daddress").value;
        let ddesg= document.getElementById("ddesg").value;
        let hdaddress= document.getElementById("hospital list").value;
        // let drole="doctor";
        console.log(dname,dmobile,daddress, ddesg, hdaddress);
        try{
            await contract2.registerDoctor(dname,dmobile,daddress,ddesg,hdaddress).then(()=>{
                alert("Doctor account created")
            })
            .catch((e)=>{
                alert("Unable to create an account. Check the account\nFor more info check console ")
                console.log(e.data.message);
            })
        }
        catch(e){
            alert("Check account. Error: "+ e);
        }
        
    }
  return (
    <div>
        <h1>Create a doctor account</h1>
        <form onSubmit={HandleSubmit}>
            <input type="text" placeholder='Doctor Name' id="dname"/>
             <br />
            <input type="text" placeholder='Doctor Mobile Number'id="dmobile"/>
            <br />
            <input type="text" placeholder='Doctor Address'id="daddress"/>
            <br />
            <input type="text" placeholder='Doctor Specialization'id="ddesg"/>
            <br />
            <label htmlFor="hospital list">Select hospital: </label>
            <select name="hospital-list" id="hospital list"> 
            </select>
          
            <br />
            <br />
            <input type="submit" name="submit" id="reg-btn" />
        </form>
        <Link to="/admin">Back to Admin panel</Link>
    </div>
  )
}

export default RegisterDoctor;