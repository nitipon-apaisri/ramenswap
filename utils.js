const db = require("./database/wallets");
const { InvalidBalance, InvalidAddress } = require("./errors");

const findWalletByToken = (tokenAddress) => {
    const theWallet = db.wallets.findIndex((wallet) => wallet.assets.find((token) => token.address === tokenAddress));
    if (theWallet !== -1) {
        return theWallet;
    } else {
        throw new InvalidAddress();
    }
};

const findTokenInWallet = (tokenAddress) => {
    const indexOfWallet = findWalletByToken(tokenAddress);
    const token = db.wallets[indexOfWallet].assets.findIndex((token) => token.address == tokenAddress);
    return token;
};

const validateBalance = (tokenAddress, tokenBalance) => {
    const wallet = findWalletByToken(tokenAddress);
    const token = findTokenInWallet(tokenAddress);
    if (db.wallets[wallet].assets[token].balance < tokenBalance) throw new InvalidBalance();
};
module.exports = {
    findWalletByToken,
    findTokenInWallet,
    validateBalance,
};
