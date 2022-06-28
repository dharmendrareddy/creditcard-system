const dotenv = require('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const ENVPATH = process.env.ENVPATH || '.env';
const envFound = dotenv.config({ path: ENVPATH });
if (!envFound) {
    // This error should crash whole process
    throw new Error('.env file not found');
}
const env = process.env;

module.exports = {
    appName: env.APP_NAME || 'CREDITCARD_SYSTEM',
    swagger: {
        protocol: env.SWAGGER_PROTOCOL || 'http',
        url: env.SWAGGER_URL || '127.0.0.1:3000'
    },
    api: {
        prefix: env.API_VERSION || '/v1'
    },
    version: env.VERSION || '1.0',
    redis: {
        host: env.REDIS_HOST || '127.0.0.1',
        port: parseInt(env.REDIS_PORT, 10) || 6379,
        db: env.REDIS_DB || 5,
        password: env.REDIS_PASSWORD || null,
        mode: env.REDIS_MODE || 'normal',
        keys: {
            CARDS: 'cards'
        }
    },
    testUser: {
        userId: 100,
        mobile: 971501234567
    },
    jwt: {
        secret: env.JWT_SECRET || 'Hi%ptOKd9J22KkP%nayz&&e%TBDy@wFp',
        expiresIn: env.JWT_TokenExpiresIn || '10d',
        issuer: env.JWT_ISSUER || 'self',
        algorithm: env.JWT_ALGORITHM || 'ES256'
    }
};