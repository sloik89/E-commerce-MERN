import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productsRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
connect();
const app = express();
app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/products", productsRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`server works on ${process.env.PORT}`);
});
