const mongoose =require('mongoose')

const ProductSchema = new mongoose.Schema({
    product_type:{ type: String, required: true, trim: true },
    brand_name:{ type: String, required: true, trim: true },
    description:{ type: String, required: true, trim: true },
    image:{ type: String },
    price:{ type: Number, required: true},
    })
const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;