const walletsModel = require("../models/wallets");

const getWallets = async (req, res, next) => {
    try {
        const wallets = walletsModel.getWallets();
        res.json(wallets);
    } catch (err) {
        next(err);
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
    const { password } = req.body;
    try {
        const createWallet = walletsModel.createWallet(password);
        res.json({ msg: createWallet });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createWallet,
    getWallets,
    getAWalletByTokenPublicKey,
};
