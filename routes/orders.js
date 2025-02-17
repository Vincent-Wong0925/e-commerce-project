const express = require('express');
const db = require('../db/index');
const { validateId } = require('../utils');

const ordersRouter = express.Router();

ordersRouter.use('/:id', validateId);

//Get all orders or orders by user_id(optional)
ordersRouter.get('/', async (req, res, next) => {
    const { user_id } = req.query;
    if(isNaN(Number(user_id))) { return res.status(400).send('Invalid user_id'); }

    const queryString = `
    SELECT * FROM orders
    ${user_id !== undefined ? `WHERE user_id = $1` : ``}`;
    let queryValue = [];
    if (user_id !== undefined) { queryValue.push(user_id); }

    let result;
    try {
        result = await db.query(queryString, queryValue);
    } catch(err) {
        return res.status(400).send(err);
    }

    if(result.rowCount == 0) { return res.status(404).send('Order not found'); }
    return res.send(result.rows);
});

//Get an order by id
ordersRouter.get('/:id', async (req, res, next) => {
    const queryString = `
    SELECT * FROM orders
    WHERE id = $1`;

    let result;
    try {
        result = await db.query(queryString, [req.params.id]);
    } catch(err) {
        return res.status(400).send(err);
    }

    if(result.rowCount == 0) { return res.status(404).send('Order not found'); }
    return res.send(result.rows);
});

//Add a new order
ordersRouter.post('/', async (req, res, next) => {
    const { user_id } = req.body;
    if (user_id == undefined) { return res.status(400).send('Missing user_id in request body'); }
    if (isNaN(Number(user_id))) { return res.status(400).send('Invalid user_id'); }

    const queryString = `
    INSERT INTO orders (user_id)
    VALUES ($1)`

    let result;
    try {
        result = await db.query(queryString, [user_id]);
    } catch(err) {
        return res.status(400).send(err);
    }
    return res.send(result);
});

module.exports = ordersRouter;