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
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js', './controllers/*.js'], // Adjust based on your file structure
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
