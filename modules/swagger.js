const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "Dong-Ne API",
    version: "1.0.0",
    description: "test"
  },
  host: "localhost:3000",
  basePath: "/"
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/app/Testinit/*.js", "./src/app/Attendance/*.js", "./src/app/Schedule/*.js", "./src/app/Group/*.js", "./src/app/Member/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
