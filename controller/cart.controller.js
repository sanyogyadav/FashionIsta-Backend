const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

/**
 * GET /cart
 * Purpose: get all products inside cart 
 */
exports.CartList = async (req, res) => {
  try {
    const cart = await Cart.findOne({ _userId: req.params.id }).populate('products')
    res.send(cart.products);
  } catch (err) {
    res.send({ message: "Cart doesn't found" });
  }
};

/**
 * POST /cart
 * Purpose: add new product
 */
exports.addProductToCart = async (req, res) => {

  // get data from request
  let user_id = req.params.id;
  let product = await Product.findOne({ _id: req.body.product_id });

  try {
    // Find if there is cart for the user
    let cartList = await Cart.findOne({ _userId: user_id });
    if (cartList) {
      cartList.products.push(product._id);
      cartList.save();

      return res.status(201).send({ message: "Product is successfully added to cart" });
    } else {
      // set data to schema
      let newCartList = new Cart({
        _userId: user_id,
        // products: [{_id: product._id}],
        products: [product._id],
      });
      // save data to db
      newCartList.save()
      return res.status(201).send({ message: "Product is successfully added to cart" });
    }
  } catch (err) {
    console.log("Cannot add product");
  }
};

/**
 * DELETE /cart/:id
 * Purpose: Delete a cart
 */

exports.emptyProductsList = (req, res) => {
  try {
    // We want to delete the all products from cart  (document with id in the URL)
    // Cart.findOneAndRemove({ _userId: req.params.id })
    Cart.deleteOne({ _userId: req.params.id });
    console.log({ message: "deleted the cart" })
    return res.status(200).send({ messgae: "Your Cart is Empty" });
  } catch (error) {
    res.send({ message: "Your cart already empty" });
  }
}
/**
 * DELETE /cart/pd/:id
 * Purpose: Delete a product
 */
exports.deleteProduct = async (req, res) => {
  // We want to delete the specified product (document with id in the URL)
  // get data from request
  let user_id = req.params.id;
  let product = await Product.findOne({ _id: req.body.product_id });
  // remove the product from list
  let cartList = await Cart.findOne({ _userId: user_id });
  cartList.products.pull(product._id);
  cartList.save();
  return res.status(201).send({ message: "Selected product removed from cart" });
};