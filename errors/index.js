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
class NoWallets extends ErrorManager {
    constructor() {
        super();
        this.message = "No Wallets";
        this.errorCode = 404;
    }
}

class InvalidBody extends ErrorManager {
    constructor() {
        super();
        this.message = "Invalid body";
        this.errorCode = 400;
    }
}

class ExistingToken extends ErrorManager {
    constructor() {
        super();
        this.message = "Alread has token";
        this.errorCode = 400;
    }
}

module.exports = {
    ErrorManager,
    InvalidBalance,
    InvalidAddress,
    InvalidBody,
    ExistingToken,
    NoWallets,
};
