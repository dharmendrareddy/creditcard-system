const winston = require('winston');
const { transports } = require('winston');
const logLevel = process.env.LOG_LEVEL || 'info';

var options = {
    level: logLevel.toLowerCase(),
    format: winston.format.printf((info) => {
        let message = {
            TimeStamp: new Date(),
            Level: info.level.toUpperCase(),
            Category: info.message,
            Data: info.data,
            UserInfo: info.userInfo
        };
        return JSON.stringify(message);
    }),
    transports: [
        new transports.Console()
    ]
}

class LoggerService {
    constructor(route) {
        this.route = route;
        options.defaultMeta = { Component: this.route };
        const logger = winston.createLogger(options);
        this.logger = logger;
    }

    async info(category, data, userInfo) {
        this.logger.log('info', category, { data, userInfo });
    }
    async debug(category, data, userInfo) {
        this.logger.log('debug', category, { data, userInfo });
    }
    async warn(category, data, userInfo) {
        this.logger.log('warn', category, { data, userInfo });
    }
    async error(category, data, userInfo) {
        this.logger.log('error', category, { data, userInfo });
    }

}
module.exports = LoggerService;