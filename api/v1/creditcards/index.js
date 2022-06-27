const express = require('express');
const router = express.Router();
const { addCard, getCards } = require('../../../lib/controller/creditCard');
const { cardValidator } = require('../../validations/creditcardValidation')

/**
 * @swagger
 *
 * /cards:
 *   get:
 *     tags:
 *      -  Creditcard
 *     description: API to get the saved creditcards
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *      200:
 *        description: Request is successfull.
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: boolean
 *              description: flag tells nature of api
 *            version:
 *              type: string
 *              description: Describes api version
 *            message:
 *              type: string
 *              default: Localized api message
 *            result:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: Customer name
 *                  cardNumber:
 *                    type: number
 *                    description: Creditcard number
 *                  balance:
 *                    type: number
 *                    description: Balance amount available in creditcard
 *                  limit:
 *                    type: number
 *                    description: Creditcard limit
 *      '400':
 *         description: Bad request.
 *      '401':
 *         description: Authorization information is missing or invalid.
 *      '404':
 *         description: A user with the specified token is not found.
 *      '5XX':
 *         description: Unexpected error.
 */
router.get('/', getCards);

/**
 * @swagger
 *
 * /cards:
 *   post:
 *     tags:
 *      -  Creditcard
 *     description: API to add a credit card
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: item
 *         schema:
 *          type: object
 *          required:
 *              - name
 *              - cardNumber
 *              - balance
 *              - limit
 *          properties:
 *              name:
 *                  type: string
 *              cardNumber:
 *                  type: number
 *              balance:
 *                  type: number
 *              limit:
 *                  type: number
 *     responses:
 *      200:
 *         description: Request is successfull.
 *      '400':
 *         description: Bad request.
 *      '401':
 *         description: Authorization information is missing or invalid.
 *      '404':
 *         description: A user with the specified token is not found.
 *      '5XX':
 *         description: Unexpected error.
 */
router.post('/', cardValidator, addCard);

module.exports = router;