import React from "react";
import Wrapper from "../wrapers/Card";
import { Stars } from "./";
import { Link } from "react-router-dom";
const Card = ({ product }) => {
  return (
    <Wrapper className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-one-line">{product.name}</h3>
        </Link>
        <p className="card-price">{product.price}</p>
        <Stars rating={product.rating} revievs={product.numReviews} />
      </div>
    </Wrapper>
  );
};

export default Card;
