const db = require("../database/wallets");
const dbAssets = require("../database/assets");
const utils = require("../utils");
const wallet = require("./wallets");
const randomstring = require("randomstring");
const randomWords = require("random-words");
const dbTransactions = require("../database/transactions");

const toExchange = (originTokenPublicKey, originTokenInput) => {
    const transaction = {
        sender: originTokenPublicKey,
        receiver: "RamenSwap",
        amount: originTokenInput,
    };
    return transaction;
};

const fromExchange = (receiverAddress, amount) => {
    const transaction = {
        sender: "RamenSwap",
        receiver: receiverAddress,
        amount: amount,
    };
    return transaction;
};

const allTransactions = () => {
    return dbTransactions.transactions;
};

const swapATokenToAnotherToken = (originTokenPublicKey, tokenContractAddress, originTokenInput, swapAmount) => {
    const indexOfWallet = utils.findWalletByTokenPublicKey(originTokenPublicKey);
    const indexOfOriginToken = utils.findTokenInWalletByPublicKey(indexOfWallet, originTokenPublicKey);
    const validateTokenContractAddress = utils.validateTokenInWallet(indexOfWallet, tokenContractAddress);
    const toExchangeTransaction = toExchange(originTokenPublicKey, originTokenInput);
    dbTransactions.transactions.push(toExchangeTransaction);
    utils.validateBalance(indexOfWallet, indexOfOriginToken, originTokenInput);
    db.wallets[indexOfWallet].assets[indexOfOriginToken].balance -= originTokenInput;
    if (validateTokenContractAddress !== undefined) {
        const indexOfDestinationToken = utils.findTokenInWalletByContractAddress(indexOfWallet, tokenContractAddress);
        //prettier-ignore
        const fromExchangeTransaction = fromExchange(db.wallets[indexOfWallet].assets[indexOfDestinationToken].publicKey,swapAmount);
        dbTransactions.transactions.push(fromExchangeTransaction);
        db.wallets[indexOfWallet].assets[indexOfDestinationToken].balance += swapAmount;
        return db.wallets[indexOfWallet].assets;
    } else {
        const tokenPublicKey = `0x${randomstring.generate(40)}`;
        const tokenPrivatekey = `0x${randomstring.generate(40)}`;
        //prettier-ignore
        const token = dbAssets.assets.find(contractAddress => contractAddress.contractAddress == tokenContractAddress)
        //prettier-ignore
        const publicTokenInfo = wallet.tokenModel(tokenContractAddress, token.name, token.symbol, token.color, token.iconUrl, token.currentPrice, tokenPublicKey, tokenPrivatekey);
        //prettier-ignore
        const sensitiveTokenInfo = wallet.tokenModel(tokenContractAddress, token.name, token.symbol, token.color, token.iconUrl, tokenPublicKey, tokenPrivatekey);
        //prettier-ignore
        const fromExchangeTransaction = fromExchange(publicTokenInfo.publicKey,swapAmount);
        dbTransactions.transactions.push(fromExchangeTransaction);
        db.wallets[indexOfWallet].assets.push(publicTokenInfo);
        db.sensitiveWalletInfo[indexOfWallet].assets.push(sensitiveTokenInfo);
        const indexOfDestinationToken = utils.findTokenInWalletByContractAddress(indexOfWallet, tokenContractAddress);
        db.wallets[indexOfWallet].assets[indexOfDestinationToken].balance += swapAmount;
        return db.wallets[indexOfWallet].assets;
    }
};

const sendATokenToAnotherWallet = (originTokenPublicKey, destinationTokenPublicKey, sendAmount) => {
    const originWallet = utils.findWalletByTokenPublicKey(originTokenPublicKey);
    const destinationWallet = utils.findWalletByTokenPublicKey(destinationTokenPublicKey);
    const indexOfOriginToken = utils.findTokenInWalletByPublicKey(originWallet, originTokenPublicKey);
    const indexOfDestinationToken = utils.findTokenInWalletByPublicKey(destinationWallet, destinationTokenPublicKey);
    utils.validateBalance(originWallet, indexOfOriginToken, sendAmount);
    db.wallets[originWallet].assets[indexOfOriginToken].balance -= sendAmount;
    db.wallets[destinationWallet].assets[indexOfDestinationToken].balance += sendAmount;
    return db.wallets[destinationWallet].assets[indexOfDestinationToken];
};

module.exports = {
    swapATokenToAnotherToken,
    sendATokenToAnotherWallet,
    allTransactions,
};
