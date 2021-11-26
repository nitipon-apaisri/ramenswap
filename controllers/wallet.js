const walletsModel = require("../models/wallet");

const getWallets = async (req, res, next) => {
    const wallets = walletsModel.getWallets();
    if (wallets.length !== 0) {
        res.json({ data: wallets });
    } else {
        res.json({ msg: "No wallet" });
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

module.exports = {
    createWallet,
    getWallets,
};
