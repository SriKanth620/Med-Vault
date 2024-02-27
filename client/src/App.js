import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
import Home from "./components/Home";
import About from "./components/About";
import { formToJSON } from "axios";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        let contractAddress = "0xa066AFe5F7fceC1D90F5D555865E90937c2ED5FD";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <div className="App">
        {/* <ParticleBackground /> */}
        {/* <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <Doctor
          account={account}
          provider={provider}
          contract={contract}
        ></Doctor>
        <Display contract={contract} account={account}></Display>
      </div> */}
        {/* <h1 className="logo">MedVault</h1> */}

        <div>
          <Navbar />
          <p className="acc-add">
            Account : {account ? account : "Not connected"}
          </p>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/patient"
              element={
                <Patient
                  account={account}
                  provider={provider}
                  contract={contract}
                ></Patient>
              }
            />
            <Route
              path="/Doctor"
              element={
                <Doctor
                  account={account}
                  provider={provider}
                  contract={contract}
                ></Doctor>
              }
            />
          </Routes>
          {/* <Home /> */}
          {/* <p className="acc-add">
            Account : {account ? account : "Not connected"}
          </p> */}
        </div>
        {/* </ParticleBackground> */}
      </div>
    </>
  );
}

export default App;
