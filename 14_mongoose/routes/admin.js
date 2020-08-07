const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/addProduct", adminController.getAddProduct);
router.post("/addProduct", adminController.postAddProduct);
router.get("/adminProducts", adminController.showProducts);
router.get("/editProduct/:id", adminController.getEditProduct);
router.post("/editProduct", adminController.postEditProduct);
router.post("/deleteProduct", adminController.postDeleteProduct);
module.exports = router;
