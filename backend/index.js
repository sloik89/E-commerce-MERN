import express from "express";
import connect from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

import products from "./data/products.js";
connect();
const app = express();
app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
app.listen(process.env.PORT, () => {
  console.log(`server works on ${process.env.PORT}`);
});
