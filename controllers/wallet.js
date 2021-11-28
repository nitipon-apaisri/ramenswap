const walletsModel = require("../models/wallet");

const getWallets = async (req, res, next) => {
    const wallets = walletsModel.getWallets();
    if (wallets.length !== 0) {
        res.json({ data: wallets });
    } else {
        res.json({ msg: "No wallet" });
    }
};

const getAWalletByTokenPublicKey = async (req, res, next) => {
    const { tokenPublicKey } = req.params;
    const wallet = walletsModel.getAWalletByTokenPublicKey(tokenPublicKey);
    try {
        res.json({ wallet: wallet });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const createWallet = async (req, res, next) => {
    try {
        walletsModel.createWallet();
        res.json({ msg: "Wallet created" });
    } catch (err) {
        next(err);
    }
};

const addToken = async (req, res, next) => {
    try {
        const { ethPublicKey, tokenContractAddress, tokenFullName, tokenName } = req.body;
        walletsModel.addToken(ethPublicKey, tokenContractAddress, tokenFullName, tokenName);
        res.json({ msg: "Token added" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createWallet,
    getWallets,
    getAWalletByTokenPublicKey,
    addToken,
};
