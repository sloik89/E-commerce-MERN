import React, { useEffect, useState } from "react";
import { Stars } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { HiMinusSm } from "react-icons/hi";
import { InputQty } from "../components";
import { useDispatch } from "react-redux";
import Wrapper from "../wrapers/Product";
import { Message } from "../components";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { useGetSingleProductQuery } from "../slices/productSlice";
import { FaBolt } from "react-icons/fa6";
const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <>
      <Wrapper className="product page-full width-90 padding-block">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div>{isError?.data?.message || isError.error}</div>
        ) : (
          <div className="product-container">
            <div className="product-info">
              <Link to="/" className="btn">
                Go back
              </Link>
              <Message variants="success-message">hello</Message>
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
                <p className="price">{(product.price * qty).toFixed(2)}</p>
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
              <div className="product-row">
                <span>Qunatity:</span>
                <div className="input-container flex-center">
                  <button
                    onClick={() => {
                      const quantity =
                        qty >= product.countInStock ? 1 : qty + 1;
                      setQty(quantity);
                    }}
                  >
                    <LuPlus />
                  </button>

                  <input type="number" value={qty} readOnly />
                  <button
                    onClick={() => {
                      const quantity = qty <= 1 ? qty : qty - 1;
                      setQty(quantity);
                    }}
                  >
                    <HiMinusSm />
                  </button>
                </div>
              </div>
              <div className="btn-container">
                <button onClick={addToCartHandler} className="btn">
                  Add to Cart
                </button>
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Product;
