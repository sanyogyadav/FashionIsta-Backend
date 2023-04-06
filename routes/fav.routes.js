const express = require("express");
const router = express.Router();
const FavController = require('../controller/fav.controller')

/** id is the user_id **/

// get the wish list of the user 
router.get('/:id', FavController.wishList)
// add product to user's wish list
router.post('/:id', FavController.addProductToList)
// empty wish list
router.delete('/:id', FavController.emptyProductsList)
// delete product from wish list
router.delete('/dp/:id', FavController.deleteProduct)

module.exports = router;