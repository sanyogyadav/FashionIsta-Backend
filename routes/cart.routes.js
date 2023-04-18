const express = require("express");
const router = express.Router();
const CartController = require('../controller/cart.controller')

/** id is the user_id **/

// get the cart of the user 
router.get('/:id', CartController.CartList)
// add product to user's cart 
router.post('/:id', CartController.addProductToCart)
// empty cart 
router.delete('/empty_cart/:id', CartController.emptyProductsList)
// delete product from cart 
router.delete('/delete_product/:id', CartController.deleteProduct)

module.exports = router;