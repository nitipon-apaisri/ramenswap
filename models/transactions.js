const db = require("../database/wallets");
const utils = require("../utils");
const wallet = require("./wallet");
const swapATokenToAnotherToken = (originPublicKey, tokenPublicKey, tokenContractAddress, swapAmount) => {
    // const indexOfWallet = utils.findWalletByToken(originPublicKey);
    // const indexOfOriginToken = utils.findTokenInWallet(originPublicKey);
    // const validateTokenContractAddress = utils.validateTokenInWallet(indexOfWallet, tokenContractAddress);
    const indexOfDestinationToken = utils.findTokenInWallet(tokenContractAddress);
    // utils.validateBalance(originPublicKey, swapAmount);
    // db.mock[indexOfWallet].assets[indexOfOriginToken].balance -= swapAmount;
    // if (validateTokenContractAddress !== undefined) {
    //     db.mock[0].assets[1].balance += swapAmount;
    //     return db.mock[0].assets[1].balance;
    // } else {
    //     const token = wallet.addToken("0xETH", "0xSHI", "Shiba Inu", "SHIB", "Blue", "");
    //     return token;
    // }
    return indexOfDestinationToken;
};
console.log(swapATokenToAnotherToken("0xETH", "", "0xdac17f958d2ee523a2206206994597c13d831ec7", 250));
const sendATokenToAnotherWallet = (originTokenPublicKey, destinationTokenPublicKey, sendAmount) => {
    const originWallet = utils.findWalletByToken(originTokenPublicKey);
    const destinationWallet = utils.findWalletByToken(destinationTokenPublicKey);
    const indexOfOriginToken = utils.findTokenInWallet(originTokenPublicKey);
    const indexOfDestinationToken = utils.findTokenInWallet(destinationTokenPublicKey);
    utils.validateBalance(originTokenPublicKey, sendAmount);
    db.wallets[originWallet].assets[indexOfOriginToken].balance -= sendAmount;
    db.wallets[destinationWallet].assets[indexOfDestinationToken].balance += sendAmount;
    return db.wallets[destinationWallet].assets[indexOfDestinationToken].balance;
};

module.exports = {
    swapATokenToAnotherToken,
    sendATokenToAnotherWallet,
};
