const transactionModel = require("../models/transactions");

const allTransactions = (req, res, next) => {
    try {
        const allTransactions = transactionModel.allTransactions();
        res.json({ allTransactions });
    } catch {
        next(err);
    }
};

const swapToken = (req, res, next) => {
    const { originTokenPublicKey, tokenContractAddress, originTokenInput, swapAmount } = req.body;
    try {
        transactionModel.swapATokenToAnotherToken(
            originTokenPublicKey,
            tokenContractAddress,
            originTokenInput,
            swapAmount
        );
        res.json({ msg: "Swap Successfull" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    swapToken,
    allTransactions,
};
