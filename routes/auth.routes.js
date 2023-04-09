const express = require("express");
const router = express.Router();
//const UserController = require('../controller/user.controller')
const AuthController = require('../controller/auth.controller')
const passportJWT = require('../middleware/passport.JWT')()
const app = express();
// middleware
app.use(passportJWT.initialize())

// router.get('/', UserController.usersList)
router.get('/profile', passportJWT.authenticate(), AuthController.me)
router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)
// if we want adding validator
// router.post('/signup', [isEmail, ...] AuthController.login)

module.exports = router;