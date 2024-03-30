import Product from "../models/product.js";
import asyncHandler from "../middleware/asyncHandlers.js";
const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: `${req.query.keyword}`, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
    file,
  } = req.body;

  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.image = file ? file : url;
    product.price = price;
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } else {
    throw new Error("Product not found");
  }
});

// @desc Delet a product
// @route DELETE /api/products/:id
// @acces Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    // user can have one comment per product
    const alredyComment = product.reviews.reviews.find(
      (item) => item.user.toString() === req.user._id.toString()
    );
    if (alredyComment) {
      res.status(400);
      throw new Error("Product allready comment");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.reviews.push(review);
    product.numReviews = product.reviews.reviews.length;
    product.rating =
      product.reviews.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("products not found");
  }
});
export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
  createProductReviews,
  getFeaturedProducts,
};
