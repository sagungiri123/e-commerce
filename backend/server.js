require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Routes import
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminImageUploadRouter = require("./routes/admin/image-upload-routes");
const shopOrderRouter = require("./routes/shop/orders-routes");
const shopProductReviewRouter = require("./routes/shop/product-review-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopFeatureRouter = require("./routes/shop/features-routes");
const userProductRouter = require("./routes/user/products-routes");
const seedAdmin = require("./seed");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const app = express();
const port = process.env.PORT || 3000;

//Global middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Seed admin user
seedAdmin();

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/image-upload", adminImageUploadRouter);
app.use("/api/shop/orders", shopOrderRouter);
app.use("/api/shop/reviews", shopProductReviewRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/features", shopFeatureRouter);
app.use("/api/user/products", userProductRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
