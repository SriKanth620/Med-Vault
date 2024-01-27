import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
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
import {Routes, Route} from "react-router-dom"
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterHospital from "./components/RegisterHospital";
import RegisterPatient from "./components/RegisterPatient";

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
        let contractAddress = "0xBA510b23bdaab1227772cD66e3543752AC67458c";

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
      <h1>Med S</h1>
      <p>
          Account : {account ? account : "Not connected"}
      </p>
      <div>
      
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/admin" element={<Admin/>} />
        <Route path="/patient" element={<Patient account={account} provider={provider} contract={contract}></Patient>}/>
        <Route path="/Doctor" element={<Doctor account={account} provider={provider} contract={contract}></Doctor>}/>
        <Route path="/admin/regpatient" element={<RegisterPatient account={account} provider={provider} contract={contract}></RegisterPatient>}/>
        <Route path="/admin/regdoctor" element={<RegisterDoctor account={account} provider={provider} contract={contract}></RegisterDoctor>}/>
        <Route path="/admin/reghospital" element={<RegisterHospital account={account} provider={provider} contract={contract}></RegisterHospital>}/>
      </Routes>
      
      
      </div>
      </div>

    </>
  );
}

export default App;
