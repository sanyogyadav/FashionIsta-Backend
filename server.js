const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();

mongoose.connect('mongodb://database:27017/SummerFashion', { useNewUrlParser: true })
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

router.use('/product',  ProductRoutes);
// /*** WISH LIST ROUTES ***/
router.use('/wish-list', FavRoutes);
// /*** CART ROUTES ***/
router.use('/cart', CartRoutes);
// /*** Auth ROUTES ***/
router.use('/auth', AuthRoutes);
// /*** User ROUTES ***/
router.use('/user', UserRoutes);

app.use('/api', router);

app.listen(3000, () => console.log('Server Started at port 3000'));