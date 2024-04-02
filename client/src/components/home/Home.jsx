import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import appIntro from "../assets/doc.json";
import HomeFeatures from "./HomeFeatures";
import HomeTools from "./HomeTools";
// import github from "./assets/github.svg";
import github from "../assets/github.svg"
import suhail from "../assets/suhail.jpeg";
import srikanth from "../assets/srikanth.jpeg";

const Home = ({ contract1, contract2 }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function connectAndPromptMetaMask() {
      if (window.ethereum) {
        try {
          // Prompt the user to connect MetaMask
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("MetaMask connected successfully");

          // You can also trigger other actions here, such as signing a transaction
          // await window.ethereum.request({ method: 'eth_sendTransaction', params: [...] });
        } catch (error) {
          console.error("Error connecting MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed");
      }
    }

    // Delay the connection process by a few milliseconds to ensure it's triggered
    setTimeout(connectAndPromptMetaMask, 100);
  }, []);

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     await contract1.displayOne();
  //     setLoading(false);
  //     alert("Contract 1 function executed successfully.");
  //   } catch (error) {
  //     console.error("Error executing contract 1 function:", error);
  //     setLoading(false);
  //     alert("Error executing contract 1 function. See console for details.");
  //   }
  // };

  // const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await contract2.displayTwo();
  //     setLoading(false);
  //     alert("Contract 2 function executed successfully. Result: " + result.join(', '));
  //   } catch (error) {
  //     console.error("Error executing contract 2 function:", error);
  //     setLoading(false);
  //     alert("Error executing contract 2 function. See console for details.");
  //   }
  // };

  return (
    <div className="home">
      <h2 className="main-message">
        One Stop User Centric <br /> <span>Decentralized</span> System <br />{" "}
        for <span>Health Records</span>
      </h2>
      <div className="app-intro">
        <div className="app-intro-content">
          <h2>
            What is <span className="logo-font">MedVault</span>?
          </h2>
          <p>
            Introducing MedVault, a groundbreaking solution revolutionizing
            healthcare record management. With a focus on security and
            transparency, MedVault empowers patients with unprecedented control
            over their medical data. Our platform addresses industry challenges,
            ensuring data integrity and fostering trust between patients and
            healthcare providers. Redefine healthcare record management with
            MedVault - where control, security, and transparency converge
            seamlessly.
          </p>
        </div>
        <div>
          <Lottie className="app-intro-animation" animationData={appIntro} />
        </div>
      </div>
      <HomeFeatures />
      <HomeTools />
      <div className="creator">
        <h2>GitHub Repository</h2>
        <a
          className="github-part"
          href="https://github.com/SriKanth620/Med-Vault"
          target="_blank"
        >
          <img src={github} alt="github-logo" />
          <h3 className="logo-font">MedVault</h3>
        </a>
        <div className="credits">
          <h3>Created with ❤️ by</h3>
          <div className="names">
            <a
              href="https://www.linkedin.com/in/suhail-shaik-6351701b2/"
              className="name"
              target="_blank"
              
            >
              <img src={suhail} alt="suhail-image" />
              <div className="name-info">
                <h3>Shaik Mohammed Suhail</h3>
                <p>Final Year Computer Science and Engineering Undergrad</p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/sri-kanth-45bbaa215/"
              className="name"
              target="_blank"
              
            >
              <img src={srikanth} alt="srikanth-image" />
              <div className="name-info">
                <h3>SriKanth U            </h3>
                <p>Final Year Computer Science and Engineering Undergrad</p>
              </div>
            </a>
          </div>
        </div>
        <h6 className="cc">© MedVault 2024. All Rights Reserved.</h6>
      </div>
    </div>
  );
};

export default Home;
