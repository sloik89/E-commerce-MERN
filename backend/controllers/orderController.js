import Order from "../models/orders.js";
import asyncHandler from "../middleware/asyncHandlers.js";
// Create new order
// POST /api/orders
// private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});
// get orders
// GET /api/orders/myorders
// private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
// get order by id
// GET /api/orders/:id
// private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// update order to paid
// GET /api/orders/:id/pay
// private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log(req.body.update_time);
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: req.body.update_time,
  });

  res.json({ msg: "update order to paid", updated: order.updatedAt });
});
// update order to delivered
// GET /api/orders/:id/deliver
// private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  console.log(req.params);
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// get all orders
// GET /api/orders
// admin/private
const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("user", "name email");
  res.status(200).json(order);
});
export {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrderById,
};
