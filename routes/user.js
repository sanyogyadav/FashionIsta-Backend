const express = require('express');
const bodyParser = require('body-parser');
// const router = express.Router();
const User = require('../model/user.model');

// router.post("/register", (req, res) => {
//     const user = req.body;

//     console.log(user, req.body);

//     return res.json({message: "User registration successful"}).status(200);
// })

const app = express.Router();
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
  app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  });
  
  app.post('/addUsers', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  });
  
  app.put('/UpdateUsers/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  });
  
  app.delete('/deleteUsers/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  });

 module.exports = app;