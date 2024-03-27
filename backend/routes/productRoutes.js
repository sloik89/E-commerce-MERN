import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
  createProductReviews,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/gallery").get(getFeaturedProducts);
router.route("/").get(getAllProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, isAdmin, updatedProduct)
  .delete(protect, isAdmin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReviews);

export default router;
