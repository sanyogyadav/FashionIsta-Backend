const express = require('express');
const router = express.Router();
const User = require('../schemas/userdb');

router.post("/register", (req, res) => {
    const user = req.body;

    console.log(user, req.body);

    return res.json({message: "User registration successful"}).status(200);
})

module.exports = router;