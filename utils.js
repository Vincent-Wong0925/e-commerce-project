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
        if (typeof value == 'string') {
            conditions.push(`${key} = "${value}"`);
        } else {
            conditions.push(`${key} = ${value}`);
        }
    }
    return conditions.join(',');
}

module.exports = {objToParams, objToQueryConditions};