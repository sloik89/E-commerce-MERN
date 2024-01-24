import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Wrapper from "../wrapers/Navbar";
const Navbar = () => {
  const [show, setShow] = useState(true);
  return (
    <Wrapper className="flex-center">
      <div className="section-center">
        <Link className="logo" to="/">
          logo
        </Link>
        <button className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </button>
        <div className={`auth-container ${show ? "show" : "hide"}`}>
          <Link to="/cart">
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
