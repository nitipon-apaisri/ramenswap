const express = require("express");
const app = express();
const logger = require("./middlewares/logger");

app.use(express.json());
app.use(logger);

module.exports = app;
