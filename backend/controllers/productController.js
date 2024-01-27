import Product from "../models/product.js";
import asyncHandler from "../middleware/asyncHandlers.js";
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export { getAllProducts, getSingleProduct };
