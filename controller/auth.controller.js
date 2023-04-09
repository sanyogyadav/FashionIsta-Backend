const jwt = require("jwt-simple");
const User = require("../model/user.model");
// to enable using .env variable
require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({status:401, message:"There is no account for this Email, try create new account"});
    }
    const validPassword = await user.validPassword(password);
    if (!validPassword) {
      return res.send({status:401, message:"Wrong Password"});
    }
    const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
    return res.send({status:200, user, token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (existingUser) {

      return res.send({status:401, message:"Email already in use try different email ID"});
    }
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);

    user = await user.save();
    const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
    return res.send({status:201, user, token });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // validatorHander(req)
    const user = await User.findById(req.user);
    // redisClient.hset('users', req.user.id, )
    // const token = jwt.encode({id:user.id}, process.env.JWT_SECRET)
    // const data = jwt.decode(token, process.env.JWT_SECRET)
    // return data
    return res.send({status:401, user});
  } catch (err) {
    next(err);
  }
};