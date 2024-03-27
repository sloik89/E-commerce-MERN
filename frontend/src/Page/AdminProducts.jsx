import React, { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductsMutation,
} from "../slices/productSlice";
import { Message, Loader } from "../components";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateProduct, Pagination } from "../components";
import Wrapper from "../wrapers/AdminProducts";
const AdminProducts = () => {
  const { pageNumber } = useParams();
  const [showProduct, setShowProduct] = useState(false);
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const handleShow = () => {
    setShowProduct(!showProduct);
  };
  const [deleteProducts, { isLoading: deleteLoading }] =
    useDeleteProductsMutation();
  const [createProduct, { isLoading: createLoading, isError: createIsError }] =
    useCreateProductMutation();
  const handleCreateProduct = async () => {
    // if (window.confirm("Are you sure ?")) {
    //   try {
    //     await createProduct();
    //     toast.success("product created");
    //     refetch();
    //   } catch (err) {
    //     console.log(err);
    //     toast.error(err?.data?.message || err.message);
    //   }
    // }
    setShowProduct(!showProduct);
  };
  const deleteHandler = async (id) => {
    console.log(id);
    try {
      await deleteProducts(id);
      refetch();
      toast.success("item removed");
    } catch (err) {
      toast.error(err.message || "Unable to delete item");
    }
  };
  return (
    <Wrapper className="admin-products page-full">
      <div className="info-products flex-around-space">
        <h1>Products</h1>
        <button onClick={handleCreateProduct} className="btn">
          Create product
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message> </Message>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    {product.name.length > 15
                      ? product.name.substring(0, 15)
                      : product.name}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="link-container">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="link-container"
                      >
                        <button className="btn">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="btn"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pages={data.pages} page={data.page} isAdmin={true} />
        </div>
      )}
      {showProduct && <CreateProduct handle={handleShow} show={showProduct} />}
    </Wrapper>
  );
};

export default AdminProducts;
