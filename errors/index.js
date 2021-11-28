class ErrorManager extends Error {}

class InvalidBalance extends ErrorManager {
    constructor() {
        super();
        this.message = "invalid balance";
        this.errorCode = 400;
    }
}
class InvalidAddress extends ErrorManager {
    constructor() {
        super();
        this.message = "Address not found!";
        this.errorCode = 404;
    }
}

module.exports = {
    InvalidBalance,
    InvalidAddress,
};
