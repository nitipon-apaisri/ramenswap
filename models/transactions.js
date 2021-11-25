const db = require("../database/wallets");
const utils = require("../utils");

const swapATokenToAnotherToken = (originAddress, tokenAddress, swapAmount) => {
    const indexOfWallet = utils.findWalletByToken(originAddress);
    const indexOfOriginToken = utils.findTokenInWallet(originAddress);
    const indexOfDestinationToken = utils.findTokenInWallet(tokenAddress);
    db.mockDataWallets[indexOfWallet].assets[indexOfOriginToken].balance -= swapAmount;
    db.mockDataWallets[indexOfWallet].assets[indexOfDestinationToken].balance +=
        swapAmount;
    return db.mockDataWallets[0].assets[indexOfDestinationToken].balance;
};
// const sendEthToAnotherWallet = (originEthAddress, destinationEthAddress) => {
//     const originAddress = utils.findWalletIndex(originEthAddress);
// };

module.exports = {
    swapATokenToAnotherToken,
};
