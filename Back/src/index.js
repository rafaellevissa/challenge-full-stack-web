const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(routes);


app.use((error, req, res, next) => {
  res.status(error.status || 500)
  return res.json({ error: error.message })
})

module.exports = app;