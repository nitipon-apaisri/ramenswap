const db = require("../database/wallets");
const dbAssets = require("../database/assets");
const utils = require("../utils");
const wallet = require("./wallet");
//prettier-ignore
const swapATokenToAnotherToken = (originPublicKey, tokenContractAddress,  swapAmount) => {
    const indexOfWallet = utils.findWalletByTokenPublicKey(originPublicKey);
    const indexOfOriginToken = utils.findTokenInWalletByPublicKey(indexOfWallet, originPublicKey);
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
        wallet.addToken(originPublicKey, tokenContractAddress, token.name , token.symbol, token.color, token.iconUrl);
        const indexOfDestinationToken = utils.findTokenInWalletByContractAddress(indexOfWallet, tokenContractAddress);
        db.mock[indexOfWallet].assets[indexOfDestinationToken].balance += swapAmount;
        return db.mock[indexOfWallet].assets;
    }
};

// console.log(swapATokenToAnotherToken("0xETH", "0x3155ba85d5f96b2d030a4966af206230e46849cb", 250));

// const sendATokenToAnotherWallet = (originTokenPublicKey, destinationTokenPublicKey, sendAmount) => {
//     const originWallet = utils.findWalletByToken(originTokenPublicKey);
//     const destinationWallet = utils.findWalletByToken(destinationTokenPublicKey);
//     const indexOfOriginToken = utils.findTokenInWallet(originTokenPublicKey);
//     const indexOfDestinationToken = utils.findTokenInWallet(destinationTokenPublicKey);
//     utils.validateBalance(originTokenPublicKey, sendAmount);
//     db.wallets[originWallet].assets[indexOfOriginToken].balance -= sendAmount;
//     db.wallets[destinationWallet].assets[indexOfDestinationToken].balance += sendAmount;
//     return db.wallets[destinationWallet].assets[indexOfDestinationToken].balance;
// };

module.exports = {
    swapATokenToAnotherToken,
    // sendATokenToAnotherWallet,
};
