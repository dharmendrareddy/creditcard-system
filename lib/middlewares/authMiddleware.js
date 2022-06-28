const httpStatus = require('http-status-codes')
const { makeResponse } = require('../utils')
const jwtUtil = require('../utils/jwtUtil')
const Logger = require('../Logger')
const logger = new Logger(__filename)

/**
 * JWT will come in a header with the form
 * Authorization: Bearer ${JWT}
 */
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const userAgent = req.useragent
    const ip = req.clientIp
    const originalUrl = req.originalUrl
    try {
        if (!authHeader) throw Error('authorization token is not provided!')
        if (!authHeader.startsWith('Bearer ')) throw Error('Bearer placeholder is missing in the auth token!')
        const token = authHeader.slice(7, authHeader.length).trimLeft()
        req.user = await jwtUtil.verify(token)
        next()
    } catch (err) {
        let responseMessage = null
        switch (err.message) {
            case 'Unauthorised':
                responseMessage = req.t('unauthorized_request_error')
                break
            default:
                responseMessage = req.t('unauthorized_request_error')
                break
        }
        logger.error({ app_message: 'INVALID_AUTH_TOKEN', metadata: { ...userAgent, ip }, log_info: { message: err.message, stack: err.stack, token: authHeader, originalUrl } })
        return makeResponse(res, false, httpStatus.StatusCodes.UNAUTHORIZED, responseMessage)
    }
}

module.exports = {
    checkAuth
}
