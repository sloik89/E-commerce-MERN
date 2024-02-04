import React, { useState } from "react";
import Wrapper from "../wrapers/InputQty";
import { HiMinusSm } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
const InputQty = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(product.qty);
  const handleQuantity = (param) => {
    let quantity;
    if (param === "+") {
      quantity = qty >= product.countInStock ? 1 : qty + 1;

      setQty(quantity);
    } else {
      quantity = qty <= 1 ? qty : qty - 1;
      setQty(quantity);
    }
    dispatch(addToCart({ ...product, qty: quantity }));
  };
  return (
    <Wrapper>
      <div className="input-container flex-center">
        <button onClick={() => handleQuantity("+")}>
          <LuPlus />
        </button>

        <input type="number" value={product.qty} readOnly />
        <button onClick={() => handleQuantity("-")}>
          <HiMinusSm />
        </button>
      </div>
    </Wrapper>
  );
};

export default InputQty;
