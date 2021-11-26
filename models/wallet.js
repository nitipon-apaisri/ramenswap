const randomstring = require("randomstring");
const db = require("../database/wallets");
const utils = require("../utils");
const randomWords = require("random-words");

const walletModel = (ethAddress, usdtAddress, recoveryPhrase) => {
    const wallet = {
        assets: [
            {
                name: "Ethereum",
                address: ethAddress,
                balance: 0,
            },
            {
                name: "USDT",
                address: usdtAddress,
                balance: 0,
            },
        ],
        recoveryPhrase: recoveryPhrase,
        supportNetworks: ["ETH"],
    };
    db.wallets.push(wallet);
};

const createWallet = () => {
    const ethAddress = `0x${randomstring.generate(10)}`;
    const usdtAddress = `0x${randomstring.generate(10)}`;
    const recoveryPhrase = randomWords(12);
    walletModel(ethAddress, usdtAddress, recoveryPhrase);
};

const getWallets = () => {
    return db.wallets;
};

const getAWalletByTokenAddress = (address) => {
    const indexOfWallet = utils.findWalletByToken(address);
    const wallet = db.mockDataWallets[indexOfWallet];
    return wallet;
};

module.exports = {
    getWallets,
    getAWalletByTokenAddress,
    createWallet,
};
