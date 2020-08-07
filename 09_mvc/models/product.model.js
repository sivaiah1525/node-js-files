const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema(
  {
    name: { type: String, required: true, max: 100 },
    price: { type: String, required: true }
  },
  { timestamps: true }
);

// export model
module.exports = mongoose.model("Product", ProductSchema);
