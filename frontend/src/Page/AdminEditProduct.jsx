import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Wrapper from "../wrapers/EditPageProduct";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from "../slices/productSlice";
import { toast } from "react-toastify";
import { Message, Loader } from "../components";
const AdminEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("electronics");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: updateLoading, isError: errorUpdate }] =
    useUpdateProductMutation();
  console.log(product);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setUrl(product.image);
      setText(product.description);
    }
  }, [product]);
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        id,
        name,
        price,
        brand,
        category,
        text,
        url,
      });
      console.log(res);
      toast.success("Product updated");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  return (
    <Wrapper className="page-full">
      <Link to="/admin/productlist" className="btn">
        go back
      </Link>
      <div className="edit-page">
        <h1>Edit Page</h1>
        {updateLoading ? (
          <Loader />
        ) : errorUpdate ? (
          <Message variants="danger"></Message>
        ) : (
          <form className="form-create" onSubmit={handleForm}>
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
                type="text"
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
        )}
      </div>
    </Wrapper>
  );
};

export default AdminEditProduct;
