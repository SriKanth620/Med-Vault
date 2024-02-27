import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import decentralization from "./assets/decentralization.json";
import scalable from "./assets/scalable.json";
import userCentric from "./assets/user-centric.json";
import easeOfUse from "./assets/ease-of-use.json";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      name: "Decentralized Architecture",
      image: decentralization,
      description:
        "Decentralizated Architecture of Blockchain provides unpararelled security",
    },
    {
      name: "Scalable",
      image: scalable,
      description: "MedVault can be scaled on a nation wide basis",
    },
    {
      name: "User Centric",
      image: userCentric,
      description:
        "Patients can control who has acess to their Medical data thus ensuring privacy",
    },
    {
      name: "Ease of Use",
      image: easeOfUse,
      description:
        "MedVault offers a easy to use interface for managing your health records",
    },
  ];

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items.map((item) => {
          return <CarouselItem item={item} />;
        })}
      </div>
      <div className="carousel-buttons">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          className="button-arrow"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className="indicators">
          {items.map((item, index) => {
            return (
              <button
                onClick={() => {
                  updateIndex(index);
                }}
                className="indicator-buttons"
              >
                <span
                  class={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  radio_button_checked
                </span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          className="button-arrow"
        >
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
