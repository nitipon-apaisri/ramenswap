const db = require("../database/wallets");
const { InvalidBalance } = require("../errors");
const utils = require("../utils");

const swapATokenToAnotherToken = (originAddress, tokenAddress, swapAmount) => {
    const indexOfWallet = utils.findWalletByToken(originAddress);
    const indexOfOriginToken = utils.findTokenInWallet(originAddress);
    const indexOfDestinationToken = utils.findTokenInWallet(tokenAddress);
    utils.validateBalance(originAddress, swapAmount);
    db.mockDataWallets[indexOfWallet].assets[indexOfOriginToken].balance -= swapAmount;
    db.mockDataWallets[indexOfWallet].assets[indexOfDestinationToken].balance +=
        swapAmount;
    return db.mockDataWallets[0].assets[indexOfDestinationToken].balance;
};

const sendATokenToAnotherWallet = (
    originTokenAddress,
    destinationTokenAddress,
    sendAmount
) => {
    const originWallet = utils.findWalletByToken(originTokenAddress);
    const destinationWallet = utils.findWalletByToken(destinationTokenAddress);
    const indexOfOriginToken = utils.findTokenInWallet(originTokenAddress);
    const indexOfDestinationToken = utils.findTokenInWallet(destinationTokenAddress);
    db.mockDataWallets[originWallet].assets[indexOfOriginToken].balance -= sendAmount;
    db.mockDataWallets[destinationWallet].assets[indexOfDestinationToken].balance +=
        sendAmount;
    return db.mockDataWallets[destinationWallet].assets[indexOfDestinationToken].balance;
};

module.exports = {
    swapATokenToAnotherToken,
    sendATokenToAnotherWallet,
};
