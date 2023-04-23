const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({

    _userId: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", },]
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;