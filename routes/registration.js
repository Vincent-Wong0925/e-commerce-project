const express = require("express");
const db = require("../db/index");

const registrationRouter = express.Router();

registrationRouter.post('/', async (req, res, next) => {
    const { username, password, email } = req.body;
    if (username == undefined) { return res.status(400).send("Missing details in request body"); }
    if (password == undefined) { return res.status(400).send("Missing details in request body"); }
    if (email == undefined) { return res.status(400).send("Missing details in request body"); }

    const queryString = `
    INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3)
    RETURNING *`;
    let result;

    try {
        result = await db.query(queryString, [username, password, email]);
    } catch(err) {
        if (err.code = "23505") { return res.status(400).send("User with this email already exists"); }
        return res.status(400).send(err);
    }
    return res.status(201).send({user: result.rows[0]});
});

module.exports = registrationRouter;