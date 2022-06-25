const express = require('express');
const router = express.Router();

const getCards = async (req, resp) => {
    return resp.send('Success');
};

const addCard = async (req, resp) => {
    return resp.send('card successfully added !!');
};

router.get('/list', getCards);
router.post('/add', addCard);
module.exports = router;