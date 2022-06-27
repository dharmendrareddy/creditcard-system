const config = require('../../config')

module.exports = {
    makeResponse: (res, status, httpCode, message, result, extraFields = {}) => {
        res.status(httpCode)
        return res.send({
            status,
            version: config.version,
            message,
            result: result,
            ...extraFields
        })
    },
    getIP: (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress,
    isValidNumber: (cardNumber) => {
        const arr = cardNumber.toString()
            .split('')
            .reverse()
            .map(x => parseInt(x));
        const sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
        return sum % 10 === 0;
    }
}
