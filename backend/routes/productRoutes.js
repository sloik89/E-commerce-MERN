import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").get(getAllProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, isAdmin, updatedProduct)
  .delete(protect, isAdmin, deleteProduct);
export default router;
