const express = require('express');
const db = require('../db/index');
const { objToQueryConditions, validateId } = require('../utils');

const productsRouter = express.Router();

productsRouter.use('/:id', validateId);

//get all products info or a type of product if query string exist in the path
productsRouter.get('/', async (req, res, next) => {
    const productType = req.query.type;
    let result;
    if (productType == undefined) {
        result = await db.query('SELECT * FROM products');
    } else {
        result = await db.query('SELECT * FROM products WHERE type = $1', [productType]);
    }

    if (result.rowCount == 0) {
        return res.status(404).send('Products not found');
    }
    return res.send({products: result.rows});
});

//get a product by id
productsRouter.get('/:id', async (req, res, next) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rowCount > 0) {
        return res.send({product: result.rows[0]});
    } else {
        return res.status(404).send('Product id not found');
    }
});

//insert a new product
productsRouter.post('/', async (req, res, next) => {
    const {name, type, price, note} = req.body;
    const queryString = 
    `INSERT INTO products (name, type, price, note) 
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    let result;
    try {
        result = await db.query(queryString, [name, type, price, note]);
    } catch(err) {
        return res.status(400).send(err);
    }
    res.status(201).send({product: result.rows[0]});
});

//Update a product by id
productsRouter.put('/:id', async (req, res, next) => {
    const queryValues = objToQueryConditions(req.body);
    const queryString = 
    `UPDATE products
    SET ${queryValues}
    WHERE id = ${req.params.id}
    RETURNING *`;
    
    let result;
    try {
        result = await db.query(queryString);
    } catch(err) {
        res.status(400).send(err);
    }

    if (result.rowCount == 0) {
        res.status(404).send('Product not found');
    }
    res.send({product: result.rows[0]});

});

//delete a product by id
productsRouter.delete('/:id', async (req, res, next) => {
    const queryString = `
    DELETE FROM products
    WHERE id = $1`;
    const result = await db.query(queryString, [req.params.id]);
    if (result.rowCount == 0) {
        return res.status(404).send('Product id not found');
    } else {
        return res.status(204).send({});
    }
});

module.exports = productsRouter;