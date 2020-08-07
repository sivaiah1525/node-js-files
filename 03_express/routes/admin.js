const path = require("path");
const express = require("express");
const routes = express.Router();
const rootDir = require("../util/path");

routes.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "view", "add-product.html"));
});

routes.post("/add-product", (req, res, next) => {
  //   res.send(`<h1>I Am User Page</h1>`);
  console.log(req.body);
  res.redirect("/");
});

module.exports = routes;
