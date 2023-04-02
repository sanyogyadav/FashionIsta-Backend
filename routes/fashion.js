const express = require('express');
const router = express.Router();

router.get("/hello", (req, res) => {
    return res.json({message: "Hello from Backend"}).status(200);
})

router.get("/hi", (req, res) => {
    return res.json({message: "Hi from Backend"}).status(200);
})

// router.post("/", (req, res) => {
    
// })

module.exports = router