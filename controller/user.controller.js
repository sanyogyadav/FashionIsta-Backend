const mongoose = require("mongoose");
const User = require("../model/user.model");

/**
 * GET /user
 * Purpose: get all users
 */
exports.usersList = async (req, res) => {

  const users = await User.find();
  res.json(users);

};
/**
 * GET /user
 * Purpose: get user by id
 */
exports.userById = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id })
    return res.send(user);
  } catch (err) {
    return res.send({ status: 404, message: "User does not exist with current ID" });
  }
};

/**
 * PATCH /user/:id
 * Purpose: Update a specified user
 */
exports.updateUser = (req, res) => {
  // We want to update the specified user (user document with id in the URL) with the new values specified in the JSON body of the request
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
      }
    }
  ).then(() => {
    res.send({ message: "updated successfully" });
  });
};
/**
 * DELETE /product/:id
 * Purpose: Delete a list
 */
exports.deleteUser = (req, res) => {
  // We want to delete the specified user (document with id in the URL)
  User.findOneAndRemove({
    _id: req.params.id,
  }).then((removedUserDoc) => {
    res.send(removedUserDoc);
  });
};