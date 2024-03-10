import React, { useState, useEffect, useRef } from "react";
import Wrapper from "../wrapers/CreateProduct";
import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../slices/productSlice";
const CreateProduct = ({ handle }) => {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("electronics");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [createProduct, { isLoading: createLoading, isError: createIsError }] =
    useCreateProductMutation();
  const handleForm = async (e) => {
    e.preventDefault();
    if (!name && !price && !brand && !category && !url && !text) {
      toast.error("Provide the value");
      console.log("jestem");
      return;
    }
    const product = {
      name,
      price,
      brand,
      image: url,
      category,
      description: text,
    };
    try {
      const res = await createProduct(product);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    ref.current.classList.add("animate");
    console.log(ref.current);
    setTimeout(() => {
      ref.current.classList.remove("animate");
    }, 1000);
  }, []);
  return (
    <Wrapper>
      <div className="form">
        <button onClick={handle} className="btn" type>
          <FaWindowClose />
        </button>
        <form className="form-create" onSubmit={handleForm} ref={ref}>
          <div className="form-row">
            <label htmlFor="product-name">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="product-name"
            />
          </div>
          <div className="form-row">
            <label htmlFor="price">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              id="price"
              name="price"
            />
          </div>
          <div className="form-row">
            <label htmlFor="brand">Brand</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              id="brand"
              name="brand"
            />
          </div>
          <div className="form-row">
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              id="category"
              name="category"
            >
              <option value="electronics">Electronics</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="image">Select image</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              id="image"
              name="image"
            />
          </div>
          <div className="form-row">
            <label htmlFor="desc">Product Description</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="desc"
              name="desc"
            />
          </div>
          <button className="create-btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
