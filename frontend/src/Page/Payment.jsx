import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { CheckoutSteps, FormContainer } from "../components";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler} className="login-form flex-column">
        <div className="form-row">
          <h3>Select Method</h3>
          <label htmlFor="paymentMethod">
            <input
              name="paymentMethod"
              type="radio"
              label="PayPal or Credit Card"
              value="PayPal"
              checked
              id="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal or Credit Card
          </label>
        </div>

        <button type="submit" className="btn btn-login">
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default Payment;
