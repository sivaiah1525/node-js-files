const Products = require("../models/product");
const shop = (req, res) => {
  Products.find()
    .then((products) => {
      res.render("shop/index", {
        title: "Shop",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCart = (req, res) => {
  // console.log(req.user.cart);
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((users) => {
      // console.log(users.cart.items);
      const product = users.cart.items;
      //console.log(product);
      res.render("shop/cart", { title: "Cart", products: product });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
};

// const postCart = (req, res) => {
//   const id = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   // console.log(id);
//   // Products.findById(id, product => {
//   //   Cart.addProduct(id, product.price);
//   // });

//   // // res.render("shop/cart", { title: "Cart" });
//   // res.redirect("/products/cart");
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: id } });
//     })
//     .then(products => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Products.findByPk(id);
//     })
//     .then(product => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity }
//       });
//     })
//     .then(() => {
//       res.redirect("/products/cart");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  // console.log(prodId);
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/products/cart");
    })
    .catch((err) => console.log(err));
};
// const checkout = (req, res) => {
//   res.render("shop/checkout", { title: "Checkout" });
// };
// const postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then(cart => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then(products => {
//       return req.user
//         .createOrder()
//         .then(order => {
//           return order.addProducts(
//             products.map(product => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch(err => console.log(err));
//     })
//     .then(result => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(result => {
//       res.redirect("/orders");
//     })
//     .catch(err => console.log(err));
// };
// const getOrder = (req, res) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then(orders => {
//       res.render("shop/order", { title: "Order", orders: orders });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findById(prodId)
    .then((product) => {
      console.log(product);
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/products/cart");
    });
};

const productDetail = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Products.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        title: "Product Details",
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const productList = (req, res) => {
  Products.find()
    .then((products) => {
      res.render("shop/product-list", {
        title: "Product-list",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  shop,
  getCart,
  postCart,
  // checkout,
  productDetail,
  productList,
  postCartDeleteProduct,
  // getOrder,
  // postOrder
};
