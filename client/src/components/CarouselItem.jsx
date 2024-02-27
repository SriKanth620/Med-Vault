import React from "react";
import Lottie from "lottie-react";

function CarouselItem({ item }) {
  return (
    <div className="features">
      <div className="feature-info">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
      <Lottie className="feature-animation" animationData={item.image} />
    </div>
  );
}

export default CarouselItem;
