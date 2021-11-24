const db = require("../database/wallets");
const utils = require("../utils");
const wallet = require("./wallet");

const swappingEthToStableCoin = (address, swapAmount) => {
    const indexOfWallet = utils.findWalletIndex(address);
    db.mockDataWallets[indexOfWallet].assets.coins[0].balance -= swapAmount;
    db.mockDataWallets[indexOfWallet].assets.tokens[0].balance += swapAmount;
    return db.mockDataWallets[0].assets.tokens[0].balance;
};

module.exports = {
    swappingEthToStableCoin,
};
