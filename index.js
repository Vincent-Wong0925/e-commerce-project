const db = require('./db/index');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', async (req, res) => {
  const result = await db.query('SELECT * FROM products');
  res.send(result.rows);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})