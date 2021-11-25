const { ErrorManager } = require("../errors/index.js");

function errorHandler(error, req, res, next) {
    if (error instanceof ErrorManager) {
        res.status(error.errorCode).json({ error: error.message });
    } else {
        res.status(500).json({ error: "something went wrong" });
    }
}

module.exports = errorHandler;
