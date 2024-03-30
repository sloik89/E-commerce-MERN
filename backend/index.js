import express from "express";
import path from "path";
import connect from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import productsRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/ordersRoute.js";
import uploadsImage from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// connect to db
connect();
const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cokie parser allow us to acces request.cookies
app.use(cookieParser());

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadsImage);
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_ID });
});
const __dirname = path.resolve();
console.log(__dirname);
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`server works on ${process.env.PORT}`);
});
