import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from "./models/orders.js";
import Product from "./models/product.js";
import connect from "./config/db.js";
import User from "./models/user.js";
dotenv.config();
connect();
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("data imported");
    process.exit(1);
  } catch (err) {
    console.log(err.message);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroyed");
    process.exit(1);
  } catch (err) {
    console.log(err.message);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
