const redis = require('../services/redis');
const Logger = require('../Logger');
const logger = new Logger(__filename);
const { redis: { keys: { CARDS } } } = require('../../config');

const redisClient = redis.getInstance();

const saveCard = async (card) => {
    const existedCards = await redisClient.get(CARDS);
    const cards = JSON.parse(existedCards) || [];
    cards.push(card);
    redisClient.set(CARDS, JSON.stringify(cards));
    return card;
};

const fetchCards = async () => {
    const data = await redisClient.get(CARDS);
    return JSON.parse(data);
};

module.exports = {
    saveCard,
    fetchCards
}