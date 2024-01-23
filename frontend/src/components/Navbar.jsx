import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Wrapper from "../wrapers/Navbar";
const Navbar = () => {
  const [show, setShow] = useState(true);
  return (
    <Wrapper className="flex-center">
      <div className="section-center">
        <a className="logo" href="/">
          logo
        </a>
        <button className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </button>
        <div className={`auth-container ${show ? "show" : "hide"}`}>
          <a href="/cart">
            <FaShoppingCart /> Cart
          </a>
          <a href="/cart">
            <FaUser />
            Sign In
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
