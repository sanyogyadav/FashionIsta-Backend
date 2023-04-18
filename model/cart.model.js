const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({

    _userId: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", },]
    // products: [{ type: String }]

})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart;