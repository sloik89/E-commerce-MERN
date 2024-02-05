import express from "express";
import connect from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import productsRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
connect();
const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cokie parser allow us to acces request.cookies
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`server works on ${process.env.PORT}`);
});
