const db = require("../database/wallets");
const dbAssets = require("../database/assets");
const utils = require("../utils");
const wallet = require("./wallet");

const swapATokenToAnotherToken = (originTokenPublicKey, tokenContractAddress, swapAmount) => {
    const indexOfWallet = utils.findWalletByTokenPublicKey(originTokenPublicKey);
    const indexOfOriginToken = utils.findTokenInWalletByPublicKey(indexOfWallet, originTokenPublicKey);
    const validateTokenContractAddress = utils.validateTokenInWallet(indexOfWallet, tokenContractAddress);
    utils.validateBalance(indexOfWallet, indexOfOriginToken, swapAmount);
    db.mock[indexOfWallet].assets[indexOfOriginToken].balance -= swapAmount;
    if (validateTokenContractAddress !== undefined) {
        const indexOfDestinationToken = utils.findTokenInWalletByContractAddress(indexOfWallet, tokenContractAddress);
        db.mock[indexOfWallet].assets[indexOfDestinationToken].balance += swapAmount;
        return db.mock[indexOfWallet].assets;
    } else {
        //prettier-ignore
        const token = dbAssets.assets.find(contractAddress => contractAddress.contractAddress == tokenContractAddress)
        //prettier-ignore
        wallet.addToken(originTokenPublicKey, tokenContractAddress, token.name, token.symbol, token.color, token.iconUrl);
        const indexOfDestinationToken = utils.findTokenInWalletByContractAddress(indexOfWallet, tokenContractAddress);
        db.mock[indexOfWallet].assets[indexOfDestinationToken].balance += swapAmount;
        return db.mock[indexOfWallet].assets;
    }
};

const sendATokenToAnotherWallet = (originTokenPublicKey, destinationTokenPublicKey, sendAmount) => {
    const originWallet = utils.findWalletByTokenPublicKey(originTokenPublicKey);
    const destinationWallet = utils.findWalletByTokenPublicKey(destinationTokenPublicKey);
    const indexOfOriginToken = utils.findTokenInWalletByPublicKey(originWallet, originTokenPublicKey);
    const indexOfDestinationToken = utils.findTokenInWalletByPublicKey(destinationWallet, destinationTokenPublicKey);
    utils.validateBalance(originWallet, indexOfOriginToken, sendAmount);
    db.mock[originWallet].assets[indexOfOriginToken].balance -= sendAmount;
    db.mock[destinationWallet].assets[indexOfDestinationToken].balance += sendAmount;
    return db.mock[destinationWallet].assets[indexOfDestinationToken];
};
console.log(sendATokenToAnotherWallet("0xETH", "0xETH2", 500));

module.exports = {
    swapATokenToAnotherToken,
    sendATokenToAnotherWallet,
};
