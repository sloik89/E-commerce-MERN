import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Link } from "react-router-dom";
import Wrapper from "../wrapers/Navbar";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const { totalItemCart } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = () => {
    console.log("logout");
  };
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
          {userInfo ? (
            <div className="dropdown">
              <p onClick={() => setShowDropdown(!showDropdown)}>
                {userInfo.name}
                {showDropdown ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
              </p>
              <ul className={`dropdown-list ${showDropdown ? "show" : "hide"}`}>
                <li>
                  <Link to="/profile"> profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}> logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <FaUser />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
