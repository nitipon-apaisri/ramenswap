const db = require("../database/wallets");
const utils = require("../utils");
const getWallets = () => {
    const wallets = db.mockDataWallets;
    return wallets.length;
};

const getAWalletByTokenAddress = (address) => {
    const indexOfWallet = utils.findWalletByToken(address);
    const wallet = db.mockDataWallets[indexOfWallet];
    return wallet;
};

module.exports = {
    getWallets,
    getAWalletByTokenAddress,
};
