const notFound = (req, res) => {
  res.render("404", { title: "Not Found" });
};

module.exports = notFound;
