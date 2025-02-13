const express = require('express');
const db = require('../db/index');

const usersRouter = express.Router();

//Get all users
usersRouter.get('/', async (req, res, next) => {
    const queryString = 
    `SELECT * FROM users`;
    let result;
    try {
        result = await db.query(queryString);
    } catch(err) {
        return res.status(400).send(err);
    }
    return res.send(result.rows);
});

//Add a new user to the database
usersRouter.post('/', async (req, res, next) => {
    const { username, password, email } = req.body;
    const queryString = 
    `INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3)`;
    let result;
    try {
        result = await db.query(queryString, [username, password, email]);
    } catch(err) {
        return res.status(400).send(err);
    }
    return res.send('New user created');
});

module.exports = usersRouter;