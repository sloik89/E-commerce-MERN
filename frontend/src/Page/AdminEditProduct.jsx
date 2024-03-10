import React from "react";
import { useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from "../slices/productSlice";
const AdminEditProduct = () => {
  const { id } = useParams();
  console.log(id);
  return <div>AdminEditProduct</div>;
};

export default AdminEditProduct;
