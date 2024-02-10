import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../wrapers/Cart";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../slices/cartSlice";
import { InputQty } from "../components";

import { FaTrash } from "react-icons/fa";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const proccedCheckout = () => {
    navigate("/login?redirect=/shipping");
  };
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Wrapper className="page-full ">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="message">
          Your cart is empty
          <Link className="btn" to="/">
            Go back
          </Link>
        </div>
      ) : (
        <div className="list-container">
          <ul className="list-items">
            {cartItems.map((item) => {
              return (
                <div className="list-item" key={item._id}>
                  <img className="item-img" src={item.image} alt={item.name} />
                  <div className="item-name">
                    <Link className="text-one-line" to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                  </div>
                  <div className="item-price">{item.price}</div>
                  <InputQty product={item} />
                  <button
                    className="btn-trash"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </ul>
          <div className="subtotal">
            <h3>Subtotoal</h3>
            <p className="subtotal-price">
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
            <Link onClick={proccedCheckout} className="btn">
              Procced to checkout
            </Link>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
