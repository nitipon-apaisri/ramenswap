const db = require("../database/wallets");
const utils = require("../utils");
const getWallets = () => {
    const wallets = db.mockDataWallets;
    return wallets.length;
};

const getWalletByEthAddress = (address) => {
    const indexOfWallet = utils.findWalletIndex(address);
    const wallet = db.mockDataWallets[indexOfWallet];
    return wallet;
};

const getTheWalletInformationByEthAddress = () => {
    const id = "0xETH";
    const indexOfWallet = db.mockDataWallets.findIndex(
        (wallet) => wallet.assets.coins[0].address == id
    );
    const wallet = db.mockDataWallets[indexOfWallet];
    return wallet;
};
module.exports = {
    getWallets,
    getWalletByEthAddress,
    getTheWalletInformationByEthAddress,
};
