import React from "react";
import Header from "./Header";
import mainBg from "../../assets/Images/main-bg.jpg";

const Carousel = () => {
  // Array of carousel items
  const carouselItems = [
    {
      id: 1,
      image: mainBg,
      interval: 1000,
      alt: "Main Background",
    },
    {
      id: 2,
      image: mainBg,
      interval: 2000,
      alt: "Main Background",
    },
    {
      id: 3,
      image: mainBg,
      interval: 4000,
      alt: "Blue Background",
    },
  ];

  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner mb-5">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval={item.interval}
            >
              <Header image={item.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
