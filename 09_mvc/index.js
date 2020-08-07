"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const product_router = require("./routes/product.routes");
const port = 1234;

const app = express();
app.use(express.static("views"));

// db connection
mongoose
  .connect("mongodb://localhost:27017/productstutorial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch(() => {
    console.error("DB Connection Unsuccessfully Something Went to Wrong !");
    process.exit(-1);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/products", product_router);

app.listen(port, () => {
  console.log(`Server Running in ${port} `);
});
