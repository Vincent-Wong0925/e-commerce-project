const express = require('express');
const db = require('../db/index');
const { validateId } = require('../utils');

const cartsRouter = express.Router();

//Get all rows from carts
cartsRouter.get('/', async (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({error: "User is not logged in"});
    }
    const userId = req.user.id;
    const queryString = `
    SELECT carts.user_id, 
        carts.product_id, 
        carts.number, 
        products.name, 
        products.price::decimal, 
        products.note, 
        products.image
    FROM carts, products
    WHERE carts.user_id = $1
        AND carts.product_id = products.id;`;

    let result;
    try {
        result = await db.query(queryString, [userId]);
    } catch(err) {
        return res.status(400).json({error: err});
    }
    return res.status(200).json({cart: result.rows});
});

//Get rows by user_id
cartsRouter.get('/:id', validateId, async (req, res, next) => {
    const queryString = `
    SELECT carts.user_id, 
        carts.product_id, 
        carts.number, 
        products.name, 
        products.price, 
        products.note, 
        products.image
    FROM carts, products
    WHERE carts.user_id = $1
        AND carts.product_id = products.id;`;

    let result;
    try {
        result = await db.query(queryString, [req.params.id]);
    } catch(err) {
        return res.status(400).send(err);
    }
    
    if (result.rowCount == 0) {
        return res.status(404).send('User not found');
    }
    return res.send({cart: result.rows});
});

//Add a row to carts
cartsRouter.post('/', async (req, res, next) => {
    const user_id = req.user.id;
    const { product_id, number } = req.body;

    let result;
    try {
        //Check if item already exist
        const cartItem = await db.query(`SELECT * FROM carts WHERE user_id = $1 AND product_id = $2`, [user_id, product_id]);
        //If exist
        if (cartItem.rowCount !== 0) {
            result = await db.query(`
                UPDATE carts
                SET number = number + $1
                WHERE user_id = $2
                AND product_id = $3
                RETURNING *`, [number, user_id, product_id]);
        } else {
            //If not exist
            result = await db.query(`
                INSERT INTO carts (user_id, product_id, number)
                VALUES ($1, $2, $3)
                RETURNING *`, [user_id, product_id, number]);
        }
    } catch(err) {
        return res.status(400).json({error: err});
    }
    return res.status(201).send({cart: result.rows[0]});
});

//Checkout a cart and insert its content into orders_products
cartsRouter.post('/checkout', async (req, res, next) => {
    const user_id = req.user.id;
    if(user_id == undefined) { return res.status(400).json({error: "missing user"}); }
    
    let queryString;
    let result;

    try {
        //validate the cart exist
        queryString = `
        SELECT EXISTS (
            SELECT 1 FROM carts
            WHERE user_id = $1
        )`;
        result = await db.query(queryString, [user_id]);
        if(result.rows[0].exists == false) { return res.status(404).json({error: "Cart not found"}); }

        //create a new order
        queryString = `
        INSERT INTO orders (user_id)
        VALUES ($1)
        RETURNING id`;
        result = await db.query(queryString, [user_id]);

        const order_id = result.rows[0].id;

        //insert products into orders_products
        queryString = `
        SELECT orders.id as order_id, 
            carts.user_id, 
            carts.product_id, 
            carts.number 
        FROM carts, orders
        WHERE carts.user_id = orders.user_id
            AND orders.id = $1`;
        result = await db.query(queryString, [order_id]);
        
        queryString = `
        INSERT INTO orders_products (order_id, product_id, number)
        VALUES ($1, $2, $3)`;
        result.rows.forEach(async ({order_id, product_id, number}) => {
            try {
                let response = await db.query(queryString, [order_id, product_id, number]);
            } catch(err) {
                return res.status(400).json({error: err});
            }
        });

        queryString = `
        SELECT * FROM orders_products
        WHERE order_id = $1`;
        result = await db.query(queryString, [order_id]);
        return res.status(200).json({orders: result.rows});
    } catch(err) {
        return res.status(400).json({error: err});
    }
});

//Update the number of a cart item by user_id and product_id(both mandatory)
cartsRouter.put('/', async (req, res, next) => {
    const { user_id, product_id } = req.query;
    const { number } = req.body;
    if (user_id == undefined) { return res.status(400).send('Missing user_id'); }
    if (product_id == undefined) { return res.status(400).send('Missing product_id'); }
    if (number == undefined) { return res.status(400).send('Missing "number" value in request body'); }
    if (isNaN(Number(number))) {return res.status(400).send('Invalid "number" value in request body'); }

    const queryString = `
    UPDATE carts
    SET number = $1
    WHERE user_id = $2
    AND product_id = $3
    RETURNING *`;

    let result;
    try {
        result = await db.query(queryString, [number, user_id, product_id]);
    } catch(err) {
        return res.status(400).send(err);
    }
    if (result.rowCount == 0) { return res.status(404).send('Cart item not found'); }
    return (res.send({cart: result.rows[0]}));
});

//Delete cart item(s) by user_id(mandatory) and product_id(optional)
cartsRouter.delete('/', async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { product_id } = req.query;
        
        if (user_id == undefined) {
            return res.status(400).json({error: 'Missing user_id'});
        }

        let result;
        let queryString = `
        DELETE FROM carts
        WHERE user_id = $1
        ${product_id !== undefined && `AND product_id = $2`}`;
        let queryValue = [user_id];
        if (product_id !== undefined) {
            queryValue.push(product_id);
        }
        result = await db.query(queryString, queryValue);
        if (result.rowCount == 0) {
            return res.status(404).json({error: 'Cart item not found'});
        }

        return res.status(204).json();
    } catch(err) {
        return res.status(400).json({error: err});
    }
});

module.exports = cartsRouter;