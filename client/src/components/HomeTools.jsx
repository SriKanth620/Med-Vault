import React from "react";
import Marquee from "react-fast-marquee";
import eth from "./assets/ethereum.svg";
import hardhat from "./assets/hardhat.svg";
import ganache from "./assets/ganache.svg";
import metamask from "./assets/metamask.svg";
import solidity from "./assets/solidity.svg";

const tools = [
  {
    image: eth,
    alt: "eth-logo",
  },
  {
    image: hardhat,
    alt: "hardhat-logo",
  },
  {
    image: ganache,
    alt: "ganache-logo",
  },
  {
    image: metamask,
    alt: "metamask-logo",
  },
  {
    image: solidity,
    alt: "solidity-logo",
  },
];

const HomeTools = () => {
  return (
    <div className="home-tools">
      <h2>Powered by</h2>
      <Marquee className="tools-box">
        {tools.map((item) => (
          <img
            key={item.image}
            className="tools-logo"
            src={item.image}
            alt={item.alt}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default HomeTools;
