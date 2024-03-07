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
import Home from "./components/Home";
import About from "./components/About";
import { formToJSON } from "axios";
import { Routes, Route } from "react-router-dom";
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterHospital from "./components/RegisterHospital";
import RegisterPatient from "./components/RegisterPatient";
import ParticlesBackground from "./components/ParticlesBackground";
import Navbar from "./components/NavBar";
import Lottie from "lottie-react";

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

        const contractAddress1 = "0x36Db19730584e54c8D9b89F794Cef78cCdcc6D3B";
        const contractAddress2 = "0xCeA5C34142c417543Ec40A62F9C59bDe55cb78b3";

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
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
