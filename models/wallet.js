const randomstring = require("randomstring");
const db = require("../database/wallets");
const utils = require("../utils");
const randomWords = require("random-words");

const walletModel = (ethAddress, ethPrivateKey, usdtAddress, usdtPrivateKey, recoveryPhrase) => {
    const publicWalletInfo = {
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
        supportNetworks: ["ETH"],
    };

    const sensitiveInfo = {
        assets: [
            {
                name: "Ethereum",
                publicKey: ethAddress,
                privateKey: ethPrivateKey,
            },
            {
                name: "USDT",
                publicKey: usdtAddress,
                privateKey: usdtPrivateKey,
            },
        ],
        recoveryPhrase: recoveryPhrase,
        supportNetworks: ["ETH"],
    };
    db.wallets.push(publicWalletInfo);
    db.sensitiveWalletInfo.push(sensitiveInfo);
};

const createWallet = () => {
    const ethAddress = `0x${randomstring.generate(10)}`;
    const usdtAddress = `0x${randomstring.generate(10)}`;
    const ethPrivateKey = `0x${randomstring.generate(14)}`;
    const usdtPrivateKey = `0x${randomstring.generate(14)}`;
    const recoveryPhrase = randomWords(12);

    walletModel(ethAddress, ethPrivateKey, usdtAddress, usdtPrivateKey, recoveryPhrase);
};

const getWallets = () => {
    return db.wallets;
};

const getAWalletByTokenAddress = (address) => {
    const indexOfWallet = utils.findWalletByToken(address);
    const wallet = db.wallets[indexOfWallet];
    return wallet;
};

module.exports = {
    getWallets,
    getAWalletByTokenAddress,
    createWallet,
};
