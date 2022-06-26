const httpStatus = require('http-status-codes')
const Joi = require('@hapi/joi')
const { makeResponse, getIP } = require('../../lib/utils')
const Logger = require('../../lib/Logger')
const logger = new Logger(__filename)

/**
 * card validation rules
 */
const cardSchema = Joi.object({
  name: Joi.string().required(),
  cardNumber: Joi.number().integer().strict().required(),
  balance: Joi.number().equal(...[0]).required(),
  limit: Joi.number().strict().required()
})

/**
 * validation
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const cardValidator = (req, res, next) => {
  const { error } = cardSchema.validate(req.body)
  if (error) {
    const ip = getIP(req)
    const agent = req.useragent
    logger.error({ app_message: 'CARD_ADDITION_BAD_REQUEST', metadata: { ...agent, ip }, log_info: { request: req.body, originalUrl: req.originalUrl, errors: error.details } })
    return makeResponse(res, false, httpStatus.StatusCodes.BAD_REQUEST, error.message)
  }
  next()
}

module.exports = {
  cardValidator
}
