const db = require("../database/wallets");
const utils = require("../utils");

const swapEthToStableCoin = (address, swapAmount) => {
    const indexOfWallet = utils.findWalletIndex(address);
    db.mockDataWallets[indexOfWallet].assets.coins[0].balance -= swapAmount;
    db.mockDataWallets[indexOfWallet].assets.tokens[0].balance += swapAmount;
    return db.mockDataWallets[0].assets.tokens[0].balance;
};

const swapEthToAnotherToken = (ethAddress, tokenAddress, swapAmount) => {
    const indexOfWallet = utils.findWalletIndex(ethAddress);
    const indexOfToken = utils.findTokenIndexOfWallet(ethAddress, tokenAddress);
    db.mockDataWallets[indexOfWallet].assets.coins[0].balance -= swapAmount;
    db.mockDataWallets[indexOfWallet].assets.tokens[indexOfToken].balance += swapAmount;
    return db.mockDataWallets[0].assets.tokens[indexOfToken].balance;
};

module.exports = {
    swapEthToStableCoin,
    swapEthToAnotherToken,
};
