// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management API',
      version: '1.0.0',
      description: 'API documentation for the Inventory Management App',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', description: 'Auto-generated id' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string' }
        },
      },
      Project: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        },
      },
      InventoryItem: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          quantity: { type: 'number' },
          project: { type: 'string', description: 'The id of the project to which this item belongs' }
        },
      },
    },
  },

  // Path to the API docs
  apis: ['./routes/*.js', './controllers/*.js'], // Adjust based on your file structure
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
