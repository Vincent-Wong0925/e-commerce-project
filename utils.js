const format = require('pg-format');

//Return query parameters ($1, $2, $3...) base on the length of an object
const objToParams = (obj) => {
    const objLength = Object.keys(obj).length;
    let params = [];
    for (let i = 0; i < objLength; i++) {
        const param = `$${i+1}`;
        params.push(param);
    }
    return params.join(',');
}

//Turn object into query conditions (key1 = value1, key2 = value2...)
const objToQueryConditions = (obj) => {
    let conditions = [];
    for (let [key, value] of Object.entries(obj)) {
        conditions.push(format('%I = %L', key, value));
    }
    return conditions.join(',');
}

//Check if the id in req.params is a number
const validateId = (req, res, next) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send('Invalid id');
    }
    next();
}

module.exports = {
    objToParams, 
    objToQueryConditions,
    validateId
};