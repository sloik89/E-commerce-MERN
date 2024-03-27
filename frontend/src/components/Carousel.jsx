import React from "react";
import Wrapper from "../wrapers/Carousell";
import Slider from "react-slick";

const Carousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        {products.map((itme) => (
          <div className="slider">
            <img className="carousel-img" src={itme.image} alt="" />
            <h3 className="carousel-desc">{itme.name}</h3>
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Carousel;
