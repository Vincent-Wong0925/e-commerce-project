const db = require('./db/index');
const express = require('express');
const productsRouter = require('./routes/products');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})