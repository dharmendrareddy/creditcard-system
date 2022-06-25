const express = require('express');
const router = express.Router();
const redis = require('../../../lib/services/redis');
const Logger = require('../../../lib/Logger');
const log = new Logger('CreditCard');

const getCards = async (req, resp) => {
    const data = await redis.get('cards');
    const cards = JSON.parse(data);
    log.info('CreditCard', 'cards fetched successfully !!');
    return resp.send(cards);
};

const addCard = async (req, resp) => {
    const card = req.body;
    const existedCards = await redis.get('cards');
    const cards = JSON.parse(existedCards) || [];
    cards.push(card);
    await redis.set('cards', JSON.stringify(cards));
    log.info('CreditCard', 'card successfully added !!');
    return resp.send('card successfully added !!');
};

router.get('/list', getCards);
router.post('/add', addCard);

module.exports = router;