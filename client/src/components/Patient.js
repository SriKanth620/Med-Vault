import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Modal from "./Modal";
import "./Modal.css";
import { Link } from "react-router-dom";
import DisplayPatientData from "./DisplayPatientData";
const Patient = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [reqlist, setReqlist]= useState([]);
  const [fileName, setFileName] = useState("No image selected");
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
            2b972864b60655f6ba99`,
            pinata_secret_api_key: `cdbddad491b32fd63c7d8f0ef692779e751b66e4023a7a2e072f548b37de78fe`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
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
  useEffect(()=>{
    const requestList= async ()=>{
      let list= await contract.displayRequestList();
      let Container= document.getElementById("Request-Container");
      for(let i=0; i<list.length; i++){
      let para= document.createElement('p');
      let div= document.createElement('div');
      let accept= document.createElement('button');
      let reject= document.createElement('button');
      para.textContent=list[i];

      accept.value="accept";
      accept.textContent="accept";
      reject.value="Reject";
      reject.textContent="Reject";
      accept.addEventListener("click", async ()=>{
        await contract.requestAccept(list[i]).then(()=>{
          alert("Permission Granted");
        })
        .catch(()=>{
          alert("Permission Rejected")
        })
      })
      reject.addEventListener("click", async ()=>{
        await contract.requestReject(list[i]).then(()=>{
          alert("Permission Rejected");
        })
        .catch(()=>{
          alert("Permission Violeted")
        })
      })
      Container.append(div);
      div.append(para);
      div.append(accept);
      div.append(reject);
      }

    };
    contract && requestList();
  },[contract])
  return (
    <div className="top">
      <div className="model-share">
     {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
     </div>
      <h1>Welcome back Patient</h1>
     
     <br/>
    
      <form className="form" onSubmit={handleSubmit}>
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
        <span className="textArea" style={{color:"red"}}>Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
      <DisplayPatientData contract={contract} account={account}></DisplayPatientData> <br/>
      <div id="Request-Container">
        
        {/* <div>
          <p>X81738173871873</p>
          <button>Accept</button>
          <button>Reject</button>
        </div>
        <div>
          <p>X81738173871873</p>
          <button>Accept</button>
          <button>Reject</button>
        </div> */}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};
export default Patient;

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
