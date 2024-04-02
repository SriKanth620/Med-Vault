import React from "react";
import Lottie from "lottie-react";
import decentralization from "../assets/decentralization.json";
import scalable from "../assets/scalable.json";
import userCentric from "../assets/user-centric.json";
import easeOfUse from "../assets/ease-of-use.json";

const items = [
  {
    name: "Decentralized Architecture",
    image: decentralization,
    description:
      "In MedVault's decentralized architecture, blockchain technology forms the backbone, ensuring the integrity and security of healthcare records. By distributing data across a network of nodes, blockchain eliminates single points of failure, enhancing resilience and transparency. Immutable records on the blockchain promote trust, enabling patients to securely manage and share their medical data with confidence.",
  },
  {
    name: "Scalable",
    image: scalable,
    description:
      "MedVault's scalablity enables seamless expansion to accommodate growing demands and users within the healthcare ecosystem. Leveraging advanced infrastructure and technologies, MedVault ensures efficient performance, responsiveness, and resource allocation. This scalability empowers the platform to adapt to evolving requirements, support increased data volumes, and maintain optimal functionality without compromising user experience or system integrity.",
  },
  {
    name: "User Centric",
    image: userCentric,
    description:
      "MedVault prioritizes user-centric design, placing patients at the forefront of healthcare record management. With intuitive interfaces and personalized experiences, MedVault empowers individuals to effortlessly access, control, and manage their medical data according to their preferences and needs. By fostering transparency and engagement, MedVault enhances patient satisfaction, trust, and empowerment within the healthcare journey",
  },
  {
    name: "Ease of Use",
    image: easeOfUse,
    description:
      "MedVault prioritizes simplicity and user-friendliness, offering intuitive interfaces and streamlined workflows for effortless navigation and interaction. With clear instructions and minimal learning curve, users can easily access, manage, and share their medical data without technical expertise. MedVault's intuitive design promotes efficiency, productivity, and user satisfaction, ensuring a seamless experience for all.",
  },
];

const HomeFeatures = () => {
  return (
    <div className="home-features">
      <h2>
        Why <span className="logo-font">MedVault</span>{" "}
      </h2>
      {/* <div className="feature">{items.map((item, index) => (
        <div key={index}>

        </div>
      ))}</div> */}
      {items.map((item, index) => (
        <div className="feature-box">
          {index % 2 === 0 ? (
            <div className="feature left" key={index}>
              <div className="feature-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <Lottie
                className="feature-animation"
                animationData={item.image}
              />
            </div>
          ) : (
            <div className="feature right" key={index}>
              <Lottie
                className="feature-animation"
                animationData={item.image}
              />
              <div className="feature-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeFeatures;
