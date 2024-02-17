import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router
  .route("/")
  .post(protect, createOrder)
  .get(protect, isAdmin, getAllOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, isAdmin, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);
export default router;
