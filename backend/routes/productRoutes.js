import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").get(getAllProducts).post(protect, isAdmin, createProduct);
router.route("/:id").get(getSingleProduct);
export default router;
