const express = require("express");
const app = express();

app.set("view engine", "ejs");

const json = [
  { id: 1, name: "Govardhan", age: 22, place: "chennai" },
  { id: 2, name: "ramu", age: 23, place: "Banglore" },
  { id: 3, name: "suhail", age: 21, place: "Hydrabhad" }
];
app.get("/", (req, res) => {
  res.render("pages/index", { data: json });
});

app.listen(5000);
console.log("5000 is the magic port");
