const express = require("express");
const createRouter = require("./routes/createProduct");
const getAllProduct = require("./routes/getAllProduct");
const updateProduct = require("./routes/updateProduct");
const deleteProduct = require("./routes/deleteProduct");
const getProduct = require("./routes/getProduct");

const app = express();

app.use(express.json());

app.use("/api/v1/products", createRouter);
app.use("/api/v1/products", getAllProduct);
app.use("/api/v1/product", getProduct);
app.use("/api/v1/products", updateProduct);
app.use("/api/v1/products", deleteProduct);

app.listen(3000, () => {
  console.log("Connected");
});
