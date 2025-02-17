const express = require('express');
const db = require('../db/index');
const { validateId } = require('../utils');

const cartsRouter = express.Router();

cartsRouter.use('/:id', validateId);

//Get all rows from carts
cartsRouter.get('/', async (req, res, next) => {
    const queryString = `
    SELECT * FROM carts`;

    let result;
    try {
        result = await db.query(queryString);
    } catch(err) {
        return res.status(400).send(err);
    }
    return res.send(result.rows);
});

//Get rows by user_id
cartsRouter.get('/:id', async (req, res, next) => {
    const queryString = `
    SELECT * FROM carts
    WHERE user_id = $1`;

    let result;
    try {
        result = await db.query(queryString, [req.params.id]);
    } catch(err) {
        return res.status(400).send(err);
    }
    
    if (result.rowCount == 0) {
        return res.status(404).send('User not found');
    }
    return res.send(result.rows);
});

//Add a row to carts
cartsRouter.post('/', async (req, res, next) => {
    const { user_id, product_id, number } = req.body;
    const queryString = `
    INSERT INTO carts (user_id, product_id, number)
    VALUES ($1, $2, $3)`;

    let result;
    try {
        result = await db.query(queryString, [user_id, product_id, number]);
    } catch(err) {
        return res.status(400).send(err);
    }
    return res.send('New entry added to carts');
});

//Delete cart item(s) by user_id(mandatory) and product_id(optional)
cartsRouter.delete('/', async (req, res, next) => {
    const { user_id, product_id } = req.query;
    if (user_id == undefined) {
        return res.status(400).send('Missing user_id');
    }
    if (isNaN(Number(user_id))) {
        return res.status(400).send('Invalid id');
    }

    const queryString = `
    DELETE FROM carts
    WHERE user_id = $1
    ${product_id !== undefined ? `AND product_id = $2` : ``}`;
    let queryValue = [user_id];
    if (product_id !== undefined) {
        queryValue.push(product_id);
    }

    let result;
    try {
        result = await db.query(queryString, queryValue);
    } catch(err) {
        return res.status(400).send(err);
    }

    if (result.rowCount == 0) {
        return res.status(404).send('Cart item not found');
    }
    return res.send(result);
});

module.exports = cartsRouter;