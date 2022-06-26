const redis = require('redis');
const { redis: redisConfig } = require('../../config');

const clientOptions = {
    port: redisConfig.port,
    host: redisConfig.host
}

const connect = () => {
    const client = redis.createClient(clientOptions);
    client.connect();
    client.on('connect', () => {
        console.log('Redis is Connected!');
    });
    return client;
}

class RedisClient {
    static init() {
        RedisClient.getInstance()
    }

    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = connect()
        }
        return RedisClient.instance
    }
}

module.exports = RedisClient