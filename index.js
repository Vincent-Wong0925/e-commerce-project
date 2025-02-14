const db = require('./db/index');
const express = require('express');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');


const app = express();
const port = 3000;

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})