const express = require("express");
const db = require("../db/index");
const bcrypt = require("bcrypt");

const registrationRouter = express.Router();

registrationRouter.post('/', async (req, res, next) => {
    const { username, password, email } = req.body;
    if (username == undefined || password == undefined || email == undefined) { 
        return res.status(400).json({error: "Missing details in request body"}); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const queryString = `
    INSERT INTO users (username, password, email)
    VALUES ($1, $2, $3)
    RETURNING *`;
    let result;

    try {
        result = await db.query(queryString, [username, hashedPassword, email]);
    } catch(err) {
        if (err.code == "23505") { return res.status(400).json({error: err}); }
        return res.status(400).json({error: err});
    }
    return res.status(201).json({user: result.rows[0]});
});

module.exports = registrationRouter;