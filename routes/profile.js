const express = require("express");

const profileRouter = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    res.status(400).json({error: "unauthenticated access"});
}

profileRouter.get('/', ensureAuthenticated, (req, res, next) => {
    console.log(req.user);
    return res.status(200).json({ id: req.user.id, username: req.user.username, email: req.user.email});
});

module.exports = profileRouter;