const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/SummerFashion', { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', (error) => (console.error(error)))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json());
app.use(cors('*'))

const ProductRoutes = require("./routes/product.routes");
const FavRoutes = require('./routes/fav.routes')
const CartRoutes = require('./routes/cart.routes')
const AuthRoutes = require('./routes/auth.routes')
const UserRoutes = require('./routes/user.routes')

// import middleware
const passportJWT = require('./middleware/passport.JWT')()
// middleware
app.use(passportJWT.initialize())

app.use('/product',  ProductRoutes);
// /*** WISH LIST ROUTES ***/
app.use('/wish-list', FavRoutes);
// /*** CART ROUTES ***/
app.use('/cart', CartRoutes);
// /*** Auth ROUTES ***/
app.use('/auth', AuthRoutes);
// /*** User ROUTES ***/
app.use('/user', UserRoutes);

app.listen(3000, () => console.log('Server Started at port 3000'));