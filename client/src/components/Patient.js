import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Modal from "./Modal";
import "./Modal.css";
import { Link } from "react-router-dom";
import DisplayPatientData from "./DisplayPatientData";
import "../App.css";
const Patient = ({ contract1, contract2, account, provider }) => {
  const [file, setFile] = useState(null);
  const [reqlist, setReqlist] = useState([]);
  const [fileName, setFileName] = useState("No image selected");
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        await contract2.checkPatient(account);
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
        contract1
          .addRecords(account, ImgHash)
          .then(() => {
            alert("Successfully Image Uploaded");
            window.setTimeout(() => {
              window.location.reload();
            }, 3000);
            setFileName("No image selected");
            setFile(null);
          })
          .catch((e) => {
            alert("You don't have an patient account");
            console.log("Error: " + e);
            console.log(e.data.message);
          });
      } catch (e) {
        alert("Unable to upload image to Pinata\nFor more info see console");
        console.log(e);
      }
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
  useEffect(() => {
    const requestList = async () => {
      let list = await contract1.displayRequestList(account);
      let Container = document.getElementById("Request-Container");
      for (let i = 0; i < list.length; i++) {
        let para = document.createElement("p");
        let div = document.createElement("div");
        let accept = document.createElement("button");
        let reject = document.createElement("button");
        para.textContent = list[i];

        accept.value = "accept";
        accept.textContent = "accept";
        reject.value = "Reject";
        reject.textContent = "Reject";
        accept.addEventListener("click", async () => {
          await contract1
            .requestAccept(list[i])
            .then(() => {
              alert("Permission Granted");
              window.setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch(() => {
              alert("Permission Rejected");
            });
        });
        reject.addEventListener("click", async () => {
          await contract1
            .requestReject(list[i])
            .then(() => {
              alert("Permission Rejected");
              window.setTimeout(() => {
                window.location.reload();
              }, 3000);
            })
            .catch(() => {
              alert("Permission Violated");
            });
        });
        Container.append(div);
        div.append(para);
        div.append(accept);
        div.append(reject);
      }
    };
    contract1 && requestList();
  }, [contract1, account]);
  // for rendering emergency notifications
  useEffect(() => {
    const renderEmergencyNotify = async () => {
      try {
        let notify = await contract2.displayEmergencyNotify(account);
        setNotifications(notify);
        console.log(notify[0]);
      } catch (e) {
        console.log(e);
        alert("Error fetching emergency notifications");
      }
    };
    contract2 && renderEmergencyNotify();
  }, [contract2, account]);

  const handleIgnore = async (doctorAddress) => {
    try {
      await contract2.ignoreEmergencyAccess(doctorAddress);
      alert("Emergency access ignored");
      window.setTimeout(() => {
        window.location.reload();
      }, 3500);
    } catch (e) {
      console.log(e);
      alert("Error ignoring emergency access");
    }
  };

  useEffect(() => {
    const CheckPatient = async () => {
      console.log(account);
      try {
        await contract2
          .checkPatient(account)
          .then(() => {
            alert("Patient account detected");
          })
          .catch(() => {
            alert("You don't have an patient account");
          });
      } catch (e) {
        alert("Try registered account " + e);
      }
    };
    contract2 && CheckPatient();
  }, [contract2, account]);
  return (
    <div className="top">
      <Link to="/patient/emergency">Emergency</Link>
      <h1>Welcome back Patient</h1>
      <div className="outer-box">
        <div className="upper patient-upper">
          <div className="model-share block">
            <h3 className="patient">Share your Records</h3>
            {!modalOpen && (
              <button
                className="choose-img share"
                onClick={() => setModalOpen(true)}
              >
                Share
              </button>
            )}
            {modalOpen && (
              <Modal
                setModalOpen={setModalOpen}
                contract1={contract1}
                contract2={contract2}
              ></Modal>
            )}
          </div>
          <form className="form block patient-form" onSubmit={handleSubmit}>
            <h3 className="patient">Upload your Records</h3>
            <label htmlFor="file-upload" className="choose-img">
              Choose image
            </label>
            <input
              className="upload-btn"
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
            />
            <span className="textArea" style={{ color: "red" }}>
              Image: {fileName}
            </span>
            <button type="submit" className="upload" disabled={!file}>
              Upload File
            </button>
          </form>
        </div>
        <div className="pending-req">
          <h3 className="patient">Pending Request</h3>
          <div id="Request-Container"></div>
          {/* <div id="EmergencyNotify-Container"></div> */}
        </div>
        <h3 className="patient">Emergency Notifications</h3>
        <div id="EmergencyNotify-Container">
          {notifications.map((notification, index) => (
            <div key={index} className="emergency-notification">
              <p>
                {index + 1}. Doctor Name: {notification.name}
              </p>
              <p>Mobile: {notification.mobile}</p>
              <p>Address: {notification.account}</p>
              <li>See emergency portal for more info</li>
              <button onClick={() => handleIgnore(notification.account)}>
                Ignore
              </button>
            </div>
          ))}
        </div>
        {/* end of EmergencyNotify */}
      </div>
      <DisplayPatientData
        contract1={contract1}
        contract2={contract2}
        account={account}
      ></DisplayPatientData>{" "}
    </div>
  );
};
export default Patient;
