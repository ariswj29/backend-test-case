const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Test Case Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
  },
  apis: ["./routes/*.ts"], // Path to your API routes
  encoding: "utf-8",
  failOnErrors: true,
  verbose: true,
  format: ".json",
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
