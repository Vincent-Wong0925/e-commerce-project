const express = require('express');
const db = require('../db/index');

const ordersRouter = express.Router();

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