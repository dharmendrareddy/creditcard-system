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
    getIP: (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
}
