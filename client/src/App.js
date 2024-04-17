import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Mycontract1 from "./artifacts/contracts/Mycontract1.sol/Mycontract1.json";
import Mycontract2 from "./artifacts/contracts/Mycontract2.sol/Mycontract2.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Doctor from "./components/Doctor";
import Admin from "./components/Admin";
import Patient from "./components/Patient";
import Home from "./components/home/Home.jsx";
import About from "./components/About";
import { formToJSON } from "axios";
import { Routes, Route } from "react-router-dom";
import RegisterDoctor from "./components/registration/RegisterDoctor";
import RegisterHospital from "./components/registration/RegisterHospital";
import RegisterPatient from "./components/registration/RegisterPatient";
import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/NavBar";
import Lottie from "lottie-react";
import EmergencyPortalDoctor from "./components/emergency/EmergencyPortalDoctor.jsx";
import EmergencyPortalPatient from "./components/emergency/EmergencyPortalPatient.jsx";

function App() {
  const [account, setAccount] = useState("");
  const [contract1, setContract1] = useState(null);
  const [contract2, setContract2] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // const contractAddress1 = "0x3bDF93ee6aa766D8714a8Af9ad474429F0b8eBa8";
        // const contractAddress2 = "0xD9Ac832A581371A6FfE088F85C3e7495f979D059";
        // const contract1AddressIn2 = "0x3bDF93ee6aa766D8714a8Af9ad474429F0b8eBa8";

        const contractAddress1 = "0x8726DC0502747f917ab189e97E0fb853d023C0E6";
        const contractAddress2 = "0x5ca12F898C7327E88EdF62ff4E2308b88C28648e";
        const contract1AddressIn2 =
          "0x8726DC0502747f917ab189e97E0fb853d023C0E6";

        const contract1 = new ethers.Contract(
          contractAddress1,
          Mycontract1.abi,
          signer
        );
        const contract2 = new ethers.Contract(
          contractAddress2,
          Mycontract2.abi,
          signer
        );

        setContract1(contract1);
        setContract2(contract2);
      } catch (error) {
        console.error("Error loading contracts:", error);
      }
    };

    if (window.ethereum) {
      loadContracts();
    } else {
      console.error("Metamask is not installed");
    }
  }, []);
  return (
    <>
      {/* <ParticlesBackground /> */}
      <div className="App">
        <Navbar account={account} />
        <p>Account : {account ? account : "Not connected"}</p>
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/"
              element={
                <Home
                  account={account}
                  provider={provider}
                  contract1={contract1}
                  contract2={contract2}
                ></Home>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/patient"
              element={
                <Patient
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></Patient>
              }
            />
            <Route
              path="/Doctor"
              element={
                <Doctor
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></Doctor>
              }
            />
            <Route
              path="/admin/regpatient"
              element={
                <RegisterPatient
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></RegisterPatient>
              }
            />
            <Route
              path="/admin/regdoctor"
              element={
                <RegisterDoctor
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></RegisterDoctor>
              }
            />
            <Route
              path="/admin/reghospital"
              element={
                <RegisterHospital
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></RegisterHospital>
              }
            />
            <Route
              path="/doctor/emergency"
              element={
                <EmergencyPortalDoctor
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></EmergencyPortalDoctor>
              }
            />
            <Route
              path="/patient/emergency"
              element={
                <EmergencyPortalPatient
                  account={account}
                  provider={provider}
                  contract2={contract2}
                  contract1={contract1}
                ></EmergencyPortalPatient>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
