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
        next(err);
    }
};

const createWallet = async (req, res, next) => {
    try {
        const createWallet = walletsModel.createWallet();
        res.json({ msg: createWallet });
    } catch (err) {
        next(err);
    }
};

const addToken = async (req, res, next) => {
    const { ethPublicKey, tokenContractAddress, tokenName, tokenSymbol, color, iconUrl } = req.body;
    try {
        //prettier-ignore
        const addToken = walletsModel.addToken(ethPublicKey, tokenContractAddress, tokenName, tokenSymbol, color, iconUrl,);
        res.json({ msg: addToken });
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
