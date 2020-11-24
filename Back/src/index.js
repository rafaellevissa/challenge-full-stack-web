const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/doc.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.json({ error: error.message })
})

module.exports = app;