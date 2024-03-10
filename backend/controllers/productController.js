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
// create products
//  POST
//   /api/products
// acces private admin
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const product = new Product({
    name: req.body.name || "Sample name",
    price: req.body.price || 0,
    user: req.user._id,
    image: req.body.image || "/sample.jpg",
    brand: req.body.brand || "Sample brand",
    category: req.body.category || "sample category",
    countInStock: 0,
    numReviews: 0,
    description: req.body.description || "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
const updatedProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    id: productId,
    name,
    price,
    brand,
    category,
    text: description,
    url,
  } = req.body;
  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.image = url;
    product.price = price;
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } else {
    throw new Error("Product not found");
  }
  console.log(name, brand, price, description);
  res.status(200).json({ msg: "updated" });
});
export { getAllProducts, getSingleProduct, createProduct, updatedProduct };
