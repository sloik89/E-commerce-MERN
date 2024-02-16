import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import Wrapper from "../wrapers/Login";
const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  console.log(shippingAddress);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <Wrapper>
      <h3 className="form-title">Shipping</h3>
      <form onSubmit={submitHandler} className="form flex-column">
        <div className="form-row">
          <label htmlFor="adress">Adress</label>
          <input
            name="adress"
            type="text"
            placeholder="Enter adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="postalCode">postalCode</label>
          <input
            name="postalCode"
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="country">eneter country</label>
          <input
            name="country"
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-login">
          Continue
        </button>
      </form>
    </Wrapper>
  );
};

export default Shipping;
