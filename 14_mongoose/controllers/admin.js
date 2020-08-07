const Product = require("../models/product");

const getAddProduct = (req, res) => {
  res.render("admin/edit-product", { title: "Add_products", editing: false });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      console.log("Data Created !");
      res.redirect("/products/adminProducts");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/products");
  }
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.redirect("/products/");
      }
      res.render("admin/edit-product", {
        title: "Edit Product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const postEditProduct = (req, res) => {
  const id = req.body.id;
  const updateTitle = req.body.title;
  const updateImgUrl = req.body.imageUrl;
  const updatePrice = req.body.price;
  const updateDesc = req.body.description;
  // const updateProduct = new Product(
  //   updateTitle,
  //   updateImgUrl,
  //   updatePrice,
  //   updateDesc
  // );
  const updateProduct = {
    title: updateTitle,
    imageUrl: updateImgUrl,
    price: updatePrice,
    description: updateDesc,
  };
  // console.log(req.body);
  Product.findByIdAndUpdate(id, updateProduct)
    .then((result) => {
      console.log("Data Updated !");
      res.redirect("/products/adminProducts");
    })
    .catch((err) => {
      console.log(err);
    });
};
const postDeleteProduct = (req, res) => {
  const id = req.body.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      console.log("Data Deleted Successfully !");
      res.redirect("/products/adminProducts");
    })
    .catch((err) => {
      console.log(err);
    });
};
const showProducts = (req, res) => {
  Product.find()
    // .select("title imageUrl price description -_id")
    // .populate("userId", "name")
    .then((products) => {
      console.log(products);
      res.render("admin/product", {
        title: "Admin Products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  showProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
