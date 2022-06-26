const httpStatus = require('http-status-codes')
const redis = require('../services/redis');
const { makeResponse } = require('../../lib/utils')
const Logger = require('../Logger');
const logger = new Logger(__filename);
const { redis: { keys: { CARDS } } } = require('../../config');

const redisClient = redis.getInstance();

/**
 * Function to get saved credit cards
 * @param {*} req 
 * @param {*} resp 
 * @returns {JSON} credit cards as JSON array
 */
const getCards = async (req, res) => {
    const ip = req.clientIp;
    const agent = req.useragent;
    try {
        const data = await redisClient.get(CARDS);
        const cards = JSON.parse(data);
        logger.debug({ app_message: 'CARDS_FETCH_SUCCESS', metadata: { ...agent, ip } });
        makeResponse(res, true, httpStatus.StatusCodes.OK, req.t('cards_fetch_success'), cards);
    }
    catch (err) {
        logger.error({ app_message: 'CARDS_FETCH_FAILURE', metdata: { ...agent, ip }, log_info: { message: err.message, stack: err.stack } });
        makeResponse(res, false, httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, req.t('cards_fetch_failed'), err.message);
    }
};

/**
 * Function to save credit card
 * @param {*} req 
 * @param {*} resp 
 * @returns {JSON} json response
 */
const addCard = async (req, res) => {
    const ip = req.clientIp;
    const agent = req.useragent;
    const card = req.body;
    try {
        const existedCards = await redisClient.get(CARDS);
        const cards = JSON.parse(existedCards) || [];
        cards.push(card);
        await redisClient.set(CARDS, JSON.stringify(cards));
        logger.debug({ app_message: 'CARD_ADD_SUCCESS', metadata: { ...agent, ip }, log_info: { card } });
        makeResponse(res, true, httpStatus.StatusCodes.CREATED, req.t('card_add_success'));
    }
    catch (err) {
        logger.error({ app_message: 'CARD_ADD_FAILURE', metdata: { ...agent, ip }, log_info: { message: err.message, stack: err.stack } });
        makeResponse(res, false, httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, req.t('card_add_failed'), err.message);
    }
};

module.exports = {
    getCards,
    addCard
}
