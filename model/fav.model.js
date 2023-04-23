const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema({

  _userId: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", }]

});
const Fav = mongoose.model("Favourite", FavSchema);

module.exports = Fav;