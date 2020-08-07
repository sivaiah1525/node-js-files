const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use((req, res) => {
  res.status(404).sendfile(path.join(__dirname, "view", "not_found.html"));
});

// res.sendFile(path.join(__dirname, ", "view", "shop.html"));

const server = http.createServer(app);

server.listen(2000);
