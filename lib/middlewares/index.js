const useragent = require('useragent')
const Logger = require('../Logger')
const logger = new Logger(__filename)
const { getIP } = require('../utils')

const userAgentMiddleware = (req, res, next) => {
    let agent = {};
    try {
        const userAgent = useragent.parse(req.headers['user-agent'])
        const agentFamily = userAgent.family || ''
        const deviceId = req.headers['device-id'] || ''
        const brand = req.headers.brand || userAgent.device.family || ''
        const model = req.headers.model || ''
        const os = req.headers.os || userAgent.os.family || ''
        const appVersion = req.headers.version || req.headers['app-version'] || ''
        const language = req.headers['accept-language'] || 'en'

        agent = {
            agent: agentFamily.toString(),
            brand: brand.toString(),
            os: os.toString(),
            deviceId: deviceId.toString(),
            model: model.toString(),
            appVersion: appVersion.toString(),
            language: language.toString().toLowerCase()
        }
    } catch (err) {
        logger.error({ app_message: 'USERAGENT_MIDDLEWARE_ERROR', log_info: { message: err.message, stack: err.stack, originalUrl: req.originalUrl } });
    }
    req.useragent = agent;
    req.clientIp = getIP(req);
    next();
}

module.exports = {
    userAgentMiddleware
}
