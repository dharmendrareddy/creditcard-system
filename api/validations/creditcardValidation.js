const httpStatus = require('http-status-codes')
const Joi = require('@hapi/joi')
const { makeResponse, getIP } = require('../../lib/utils')
const Logger = require('../../lib/Logger')
const logger = new Logger(__filename)

/**
 * card validation rules
 */
const cardSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'customer_name_required',
    'any.required': 'customer_name_required'
  }),
  cardNumber: Joi.number().min(8).integer().strict().required(),
  balance: Joi.number().default(0),
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
