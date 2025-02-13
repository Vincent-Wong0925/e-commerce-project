const express = require('express');
const db = require('../db/index');
const { objToQueryConditions ,validateId } = require('../utils');

const usersRouter = express.Router();

usersRouter.use('/:id', validateId);

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

//Get a user by id
usersRouter.get('/:id', async (req, res, next) => {
    const queryString = `
    SELECT * FROM users
    WHERE id = $1`;
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

//Update a user by id
usersRouter.put('/:id', async (req, res, next) => {
    const queryValues = objToQueryConditions(req.body);
    const queryString = `
    UPDATE users
    SET ${queryValues}
    WHERE id = $1`;
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

//Delete a user by id
usersRouter.delete('/:id', async (req, res, next) => {
    const queryString = `
    DELETE FROM users
    WHERE id = $1`;
    let result;

    try {
        result = await db.query(queryString, [req.params.id]);
    } catch(err) {
        return res.status(400).send(err);
    }

    if (result.rowCount == 0) {
        return res.status(404).send('User not found');
    }
    return res.send('User deleted');
});

module.exports = usersRouter;