import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Wrapper from "../wrapers/Navbar";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const { totalItemCart } = useSelector((state) => state.cart);
  return (
    <Wrapper className="flex-center ">
      <div className="section-center width-90">
        <Link className="logo" to="/">
          logo
        </Link>
        <button className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </button>
        <div className={`auth-container ${show ? "show" : "hide"}`}>
          <Link to="/cart">
            <span className="total-cart flex-center">
              {!totalItemCart ? 0 : totalItemCart}
            </span>
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/login">
            <FaUser />
            Sign In
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
