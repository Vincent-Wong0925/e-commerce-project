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

//insert a new product
productsRouter.post('/', async (req, res, next) => {
    const {name, type, price, note} = req.body;
    const queryString = 
    `INSERT INTO products (name, type, price, note) 
    VALUES ($1, $2, $3, $4)`;
    let result;
    try {
        result = await db.query(queryString, [name, type, price, note]);
    } catch(err) {
        return res.status(400).send(err);
    }
    res.send(result);
});

//delete a product by id
productsRouter.delete('/:id', async (req, res, next) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send('Invalid product id');
    }
    const queryString = `
    DELETE FROM products
    WHERE id = $1`;
    const result = await db.query(queryString, [req.params.id]);
    if (result.rowCount == 0) {
        return res.status(404).send('Product id not found');
    } else {
        return res.send("Deleted 1 row");
    }
});

module.exports = productsRouter;