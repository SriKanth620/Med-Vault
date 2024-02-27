import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import eth from "./assets/ethereum.svg";
import hardhat from "./assets/hardhat.svg";
import ganache from "./assets/ganache.svg";
import metamask from "./assets/metamask.svg";
import solidity from "./assets/solidity.svg";
import Lottie from "lottie-react";
import rings from "./assets/rings.json";
import animation from "./assets/doc.json";
import Carousel from "./Carousel";
import github from "./assets/github.svg";
import suhail from "./assets/suhail.jpeg";
import srikanth from "./assets/srikanth.jpeg";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        {/* <Navbar /> */}
        {/* home page bro */}
        {/* <Link to="/doctor">Doctor</Link> <br />
        <Link to="/patient">Patient</Link>
        <h1>home page content goes here</h1> */}
        {/* <motion.h2
          animate={{ x: 100, scale: 1 }}
          initial={{ scale: 0 }}
          className="main-message"
        >
          One Stop User Centric <br /> <span>Decentralized</span> System <br />{" "}
          for <span>Medical Records</span>{" "}
        </motion.h2> */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          className="main-message"
        >
          {" "}
          One Stop User Centric <br /> <span>Decentralized</span> System <br />{" "}
          for <span>Health Records</span>
          {/* <div className="rings-div">
            <Lottie animationData={rings} />
          </div> */}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="app-intro"
        >
          <div className="app-intro-content">
            <h2>
              What is <span className="logo-font">MedVault</span>?
            </h2>
            <p>
              Introducing MedVault, a groundbreaking solution revolutionizing
              healthcare record management. With a focus on security and
              transparency, MedVault empowers patients with unprecedented
              control over their medical data. Our platform addresses industry
              challenges, ensuring data integrity and fostering trust between
              patients and healthcare providers. Redefine healthcare record
              management with MedVault - where control, security, and
              transparency converge seamlessly.
            </p>
          </div>
          <div>
            <Lottie className="app-intro-animation" animationData={animation} />
          </div>
        </motion.div>
        <div className="home-features">
          <h2>
            Why <span className="logo-font">MedVault</span>{" "}
          </h2>
          <Carousel></Carousel>
          {/* <div className="feature-list">
            <div className="feature-row">
              <div className="feature">
                <p className="feature-name">Decentralizated Architecture</p>
                <p>
                  Decentralizated Architecture of Blockchain provides
                  unpararelled security
                </p>
              </div>
              <div className="feature">
                <p className="feature-name">Scability</p>
                <p>MedVault can be scaled on a nation wide basis.</p>
              </div>
            </div>
            <div className="feature-row">
              <div className="feature">
                <p className="feature-name">Gives power to patient</p>
                <p>
                  Patients can control who has acess to their Medical data thus
                  ensuring privacy.
                </p>
              </div>
              <div className="feature">
                <p className="feature-name">ease of use</p>
                <p>
                  {" "}
                  MedVault offers a easy to use interface for managing your
                  health records.
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="home-tools">
          <h2>Powered by</h2>
          <Marquee>
            <div className="logo-marq">
              <img className="eth tools-logo" src={eth} alt="eth-logo" />
              <img
                className="sol tools-logo"
                src={solidity}
                alt="solidity-logo"
              />

              <img
                className="ganache tools-logo"
                src={ganache}
                alt="ganache-logo"
              />

              <img
                className="metamask tools-logo"
                src={metamask}
                alt="metamask logo"
              />

              <img
                className="hardhat tools-logo"
                src={hardhat}
                alt="hardhat-logo"
              />
            </div>
          </Marquee>
        </div>
        <div className="creator">
          <h2>GitHub Repository</h2>
          <a
            className="github"
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
                  <h3>SriKanth U</h3>
                  <p>Final Year Computer Science and Engineering Undergrad</p>
                </div>
              </a>
            </div>
          </div>
          <h6>© MedVault 2024. All Rights Reserved.</h6>
        </div>
      </div>
    );
  }
}
