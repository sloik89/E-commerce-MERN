import React from "react";
import Wrapper from "../wrapers/CheckoutSteps";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Wrapper>
      <ul className="checkout-links flex-center">
        <li>
          {step1 ? (
            <Link to="/login">Sign in</Link>
          ) : (
            <Link disabled to="/login">
              Sign in
            </Link>
          )}
        </li>
        <li>
          {step2 ? (
            <Link to="/shipping">Shipping</Link>
          ) : (
            <Link disabled>Shipping</Link>
          )}
        </li>
        <li>
          {step3 ? (
            <Link to="/payment">Payment</Link>
          ) : (
            <Link disabled>Payment</Link>
          )}
        </li>
        <li>
          {step4 ? (
            <Link to="/placeorder">Place order</Link>
          ) : (
            <Link disabled>Place order</Link>
          )}
        </li>
      </ul>
    </Wrapper>
  );
};

export default CheckoutSteps;
