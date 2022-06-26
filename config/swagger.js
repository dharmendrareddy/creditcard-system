const swaggerJsdoc = require('swagger-jsdoc')
const config = require('./index')

const url = config.swagger.url
const protocol = config.swagger.protocol
const basePath = config.api.prefix

const options = {
    swaggerDefinition: {
      info: {
        description: 'Credit Card API documentation',
        title: 'Credit Card API',
        version: '1.0'
      },
      host: url,
      basePath: basePath,
      schemes: [protocol],
      consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],
      securityDefinitions: {
        authentication: {
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{
        authentication: []
      }],
      servers: [
        {
          url: `${protocol}://${url}/${basePath}`,
          description: 'Local server'
        }
      ],
      components: {
        schemas: {},
        securitySchemes: {
          bearerAuth: {
            type: protocol,
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    apis: [`${process.cwd()}/api/v1/creditcards/index.js`]
  }

module.exports = swaggerJsdoc(options)