import React, { useEffect, useState } from "react";
import { Stars } from "../components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../wrapers/Product";

import axios from "axios";
import { FaBolt } from "react-icons/fa6";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(`/api/products/${id}`);
      console.log(id);
      setProduct(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Wrapper className="product page-full width-90 padding-block">
        <div className="product-info">
          <Link to="/" className="btn">
            Go back
          </Link>
          <h3>{product.name}</h3>
          <div className="product-reviews">
            <Stars rating={product.rating} revievs={product.numReviews} />
            <p>({product.numReviews}) reviews</p>
          </div>
          <img src={product.image} alt="" />
          <div className="product-desc">{product.description}</div>
        </div>
        <div className="product-result flex-column">
          <div className="product-row">
            <span>Price:</span>
            <p className="price">{product.price}</p>
          </div>
          <div className="product-row">
            <span>Delivery Time:</span>
            <p>
              <FaBolt /> Instant
            </p>
          </div>
          <div className="product-row">
            <span>In Stock:</span>
            <p>{product.countInStock}</p>
          </div>
          <div className="btn-container">
            <button className="btn">Add to Cart</button>
            <button className="btn">Buy Now</button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Product;
