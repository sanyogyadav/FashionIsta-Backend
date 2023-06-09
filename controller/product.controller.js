const Product = require('../model/product.model')

/**
 * GET /product
 * Purpose: get all products
 */
exports.productsList = async (req, res) => {
  const product = await Product.find()
  res.send(product);
};
/**
 * GET /product
 * Purpose: get product by id
 */
exports.productById = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id })
    res.json(product);
  } catch (err) {
    res.send({ message: "Product does not exist with given ID" })
  }
};
/**
 * POST /product
 * Purpose: add new product
 */
exports.newProduct = async (req, res) => {
  // get data from request
  let type = req.body.product_type;
  let brandName = req.body.brand_name;
  let product_description = req.body.description;
  let image = req.body.image;
  let price = req.body.price;
  // set data to schema
  let newProduct = new Product({
    product_type: type,
    brand_name: brandName,
    description: product_description,
    image: image,
    price: price
  });
  // save data to db
  await newProduct.save()
  res.json(newProduct);

};
/**
 * PATCH /product/:id
 * Purpose: Update a specified product
 */
exports.updateProduct = async (req, res) => {
  // We want to update the specified product (product document with id in the URL) with the new values specified in the JSON body of the request
  const productObj = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  console.log(productObj);
  res.json(productObj);
};
/**
 * DELETE /product/:id
 * Purpose: Delete a list
 */
exports.deleteProduct = (req, res) => {
  // We want to delete the specified product (document with id in the URL)
  Product.findOneAndRemove({
    _id: req.params.id,
  }).then((removedProductDoc) => {
    res.send(removedProductDoc);
  });
};