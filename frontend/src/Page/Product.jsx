import React, { useEffect, useState } from "react";
import { Stars } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { HiMinusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../wrapers/Product";
import { Message } from "../components";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { addToCart } from "../slices/cartSlice";

import {
  useGetSingleProductQuery,
  useCreateProductReviewsMutation,
} from "../slices/productSlice";
import { FaBolt } from "react-icons/fa6";

const Product = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetSingleProductQuery(id);
  const [createProductReviews, { isLoading: loadingReviews, isError: error }] =
    useCreateProductReviewsMutation();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!rating && !comment) {
      toast.error("Please fill the fields");
      return;
    }
    try {
      const res = await createProductReviews({
        comment,
        rating,
        productId: id,
      });

      if (res.error?.status === 400) {
        throw new Error(res.error.data.message);
      }
      toast.success("Review added");
      setRating("");
      setComment("");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Unable to put comment");
    }
    console.log(comment, rating);
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
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(addToCart({ ...product, qty }));
                    navigate("/shipping");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
        {product?.reviews.reviews.length === 0 ? (
          <Message>No reviews</Message>
        ) : (
          <div className="product-reviews">
            <h3>Reviews</h3>
            {product?.reviews.reviews.map((item) => {
              return (
                <div key={item._id}>
                  <p>{item.name}</p>
                  <p>{item.comment}</p>
                  <Stars rating={item.rating} />
                </div>
              );
            })}
          </div>
        )}
        {userInfo ? (
          <form className="form-comment" onSubmit={handleComment}>
            <h3>Comment Product</h3>
            <div className="form-row">
              <label htmlFor="rating">Rating</label>
              <select
                name="rating"
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="">Select...</option>
                <option value="1">1-Poor</option>
                <option value="2">2-Fair</option>
                <option value="3">3-Good</option>
                <option value="4">4-Very Good</option>
                <option value="5">4-Exelent</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="comment">Comment</label>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                value={comment}
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Comment
            </button>
          </form>
        ) : (
          <Message>You need to login in to put a comment </Message>
        )}
      </Wrapper>
    </>
  );
};

export default Product;
