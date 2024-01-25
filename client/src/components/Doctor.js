import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import Display from "./Display";
import { Link } from "react-router-dom";
import "../App.css"
const Doctor = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let account1=document.getElementById("patient-id").value
    // alert("old: "+ account+ " new: "+ account1)
    try {
      // let res;
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `
                2b972864b60655f6`,
                pinata_secret_api_key: `paste api secret cdbddad491b3751b67de78fe`,
                "Content-Type": "multipart/form-data",
              },
            });
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
            let res =contract.add(account1,ImgHash).then(() => {
              // Success case
              alert("Successfully Image Uploaded");
            })
            .catch(() => {
              // Error case
              alert("You dont have access ");
            })
            console.log(res);
            setFileName("No image selected");
            setFile(null);
          } catch (e) {
            alert("Unable to upload image to Pinata");
          }
      }
    } 
    catch (e) {
       alert(e);
       console.log("over da");
    }
    
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  const HandleRequestSubmit= async (e)=>{
    e.preventDefault();
    let patient_address= document.getElementById("patient_address").value;
    console.log(patient_address);
    try{
      await contract.requestToPatient(patient_address).then(()=>{
        alert("Request Sent to "+ patient_address);
      })
      .catch(()=>{
        alert("Unable to send the request");
      })
    }
    catch(e){
      alert("Check react Error: "+ e);
    }
  };

  return (
    <div className="top">
       <h1>Welcome back Doctor</h1>
      <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="patient-file-upload" className="choose patient">
          Choose patient
        </label>
        <input type="text" id="patient-id" name="id"/>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea"style={{color:"red"}}>Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
      <Display contract={contract} account={account}></Display>
      <br/>
      <h3>Request Access From Patient</h3>
      <form onSubmit={HandleRequestSubmit}>
        <input type="text" id="patient_address"/>
        <input type="submit"/>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};
export default Doctor;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
