import React from "react";
import Wrapper from "../wrapers/Carousell";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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
      <div className="main-slider">
        <Slider {...settings}>
          {products.map((item) => (
            <div key={item._id} className="slider">
              <img className="carousel-img" src={item.image} alt="" />
              <div className="carousel-desc">
                <Link to={`/product/${item._id}`} className="link">
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Wrapper>
  );
};

export default Carousel;
