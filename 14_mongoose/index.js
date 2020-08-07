const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2000;
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.set("views", "views");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  User.findById("5e8f4e7ac2139e32b86b365f")
    .then((user) => {
      req.user = user;
      // console.log(user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/products", adminRoutes);
app.use("/products", shopRoutes);
app.use(errorController);
mongoose
  .connect("mongodb://localhost:27017/product_shop", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Govardhan",
          email: "goabala88@gmail.com",
          cart: [],
        });
        user.save();
      }
    });
    app.listen(port, () => {
      console.log("DB Connected !");
      console.log(`Server is running port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
