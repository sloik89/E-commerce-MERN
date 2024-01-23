import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Wrapper from "../wrapers/Navbar";
const Navbar = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <a href="/">logo</a>
        <button>
          <GiHamburgerMenu />
        </button>
      </div>
      Navbar
    </Wrapper>
  );
};

export default Navbar;
