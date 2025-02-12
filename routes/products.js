const express = require('express');
const db = require('../db/index');
const productsRouter = express.Router();

//get all products info
productsRouter.get('/', async (req, res, next) => {
    const result = await db.query('SELECT * FROM products');
    res.send(result.rows);
});

//get a product by id
productsRouter.get('/:id', async (req, res, next) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send('Invalid product id');
    }
    const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
        return res.send(result.rows);
    } else {
        return res.status(404).send('Product id not found');
    }
});

module.exports = productsRouter;