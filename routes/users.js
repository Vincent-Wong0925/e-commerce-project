const express = require('express');
const db = require('../db/index');

const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {

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