const Favourite = require("../model/fav.model");
const Product = require("../model/product.model");

/**
 * GET /wish-list
 * Purpose: get all products inside wish list
 */
exports.wishList = async (req, res) => {
  try {
    const fav = await Favourite.findOne({ _userId: req.params.id }).populate('products')
    res.send(fav.products);
  } catch (err) {
    res.send({ message: "WishList Not Found" });
  }
};

/**
 * POST /wish-list
 * Purpose: add new product
 */
exports.addProductToList = async (req, res) => {
  // get data from request
  let user_id = req.params.id;
  let product = await Product.findOne({ _id: req.body.product_id });
  // Find if there is wish list for the user
  try {
    let wishList = await Favourite.findOne({ _userId: user_id });
    if (wishList) {
      wishList.products.push(product._id);
      wishList.save();

      // return res.send(wishList);
      return res.status(201).send({ message: "Product is successfully added to Wishlist" });

    } else {
      // set data to schema
      let newWishList = new Favourite({
        _userId: user_id,
        products: [product._id],
      });
      // save data to db
      newWishList.save();
      return res.status(201).send({ message: "Product is successfully added to Wishlist" });

    }
  } catch (err) {
    console.log("Cannot add wishlist");
  }
};

/**
 * DELETE /wish-list/:id
 * Purpose: Delete a list
 */
exports.emptyProductsList = (req, res) => {
  // We want to delete the all products from wish list (document with id in the URL)
  Favourite.findOneAndRemove({ _userId: req.params.id }).then(
    (removedProductDoc) => {
      res.send(removedProductDoc);
    }
  );
};
/**
 * DELETE /wish-list/pd/:id
 * Purpose: Delete a product
 */
exports.deleteProduct = async (req, res) => {
  // We want to delete the specified product (document with id in the URL)
  // get data from request
  let user_id = req.params.id;
  var product_id = Product({ _id: req.body.product_id });
  // remove the product from list
  let wishList = await Favourite.findOne({ _userId: user_id });
  wishList.products.pull(product_id);
  wishList.save();
  // return res.send(wishList);
  return res.status(201).send({ message: "Selected product removed from wishlist" });
};