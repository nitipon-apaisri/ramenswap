const express = require("express");
const app = express();
const logger = require("./middlewares/logger");
const router = require("./routes/index");

app.use(express.json());
app.use(logger);
app.use(router);
module.exports = app;
