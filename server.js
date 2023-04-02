const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/SummerFashion', { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', (error) => (console.error(error)))
db.once('open', () => console.log('Connected to Database'))
const fashionRouter = require('./routes/fashion.js');
const userRouter = require('./routes/user.js');

app.use(express.json());
app.use(cors('*'))

app.use('/products', fashionRouter);
app.use('/user', userRouter);

app.listen(3000, () => console.log('Server Started at port 3000'));