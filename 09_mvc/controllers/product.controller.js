const Product = require("../models/product.model");
exports.test = (req, res) => {
  res.send("Router With Controller Working");
};

// create details
exports.product_create = (req, res, next) => {
  let product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product.save(err => {
    if (err) {
      return next(err);
    }
    res.send("Data Created Successfully");
  });
};
// get details
exports.product_details = (req, res, next) => {
  Product.find((err, product) => {
    if (err) return next(err);
    res.send(product);
  });
};

// delete details
exports.product_delete = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("delete successfully");
  });
};
exports.product_get_editDetails = (req, res, next) => {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_editDetails_update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err) {
    if (err) return next(err);
    res.send("data successfully edited");
  });
};
