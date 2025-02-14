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

cartsRouter.delete('/:id', async (req, res, next) => {
    const queryString = `
    DELETE FROM carts
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
    return res.send(result);
});

module.exports = cartsRouter;