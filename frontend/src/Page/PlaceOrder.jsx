import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../wrapers/PlaceOrder";
import { useCreateOrderMutation } from "../slices/ordersSlices";
import { CheckoutSteps } from "../components";
import { Message } from "../components";
import { Link } from "react-router-dom";
import { clearCart } from "../slices/cartSlice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const handleOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        taxPrice,
        shippingAddress,
        shippingPrice,
        paymentMethod,
        totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress.address, paymentMethod, navigate]);
  return (
    <Wrapper className="page-full">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="order">
        <div className="address">
          <h3 className="text-header">Shipping</h3>
          <p>
            <strong>Address </strong>
            {shippingAddress.address},{shippingAddress.city}
            {shippingAddress.postalCode}
            {shippingAddress.country}
          </p>
        </div>
        <div className="payment">
          <h3 className="text-header">Payment method</h3>
          <p>{paymentMethod}</p>
        </div>
        {cartItems.length === 0 ? (
          <Message />
        ) : (
          <div className="cart-items">
            <h3 className="text-header">Order items</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item">
                <img src={item.image} alt="" />
                <Link to={`/product/${item._id}`}>{item.name}</Link>
                <p>
                  {item.qty} x {item.price} = ${item.qty * item.price}
                </p>
              </div>
            ))}
            <div className="order-summary">
              <h3 className="text-header">Order Summary</h3>
              <p> Items: {itemsPrice}</p>
              <p> Shipping: {shippingPrice}</p>
              <p> Tax: {taxPrice}</p>
              <p className="total-price"> Total: {totalPrice}</p>
              <button onClick={handleOrder} className="btn">
                Place order
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default PlaceOrder;
