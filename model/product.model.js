const mongoose =require('mongoose')

const ProductSchema = new mongoose.Schema({
    title:{ type: String, required: true, trim: true },
    sub_title:{ type: String, required: true, trim: true },
    description:{ type: String, required: true, trim: true },
    })
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;