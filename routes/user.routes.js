const express = require("express");
const router = express.Router();
const UserController = require('../controller/user.controller')
const AuthController = require('../controller/auth.controller')

router.get('/', UserController.usersList)
router.get('/:id', UserController.userById)
router.post('/', AuthController.signup)
router.patch('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router;