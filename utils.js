const db = require("./database/wallets");
const { InvalidBalance, InvalidAddress, ExistingToken } = require("./errors/index");

const findWalletByToken = (tokenPublicKey) => {
    const theWallet = db.wallets.findIndex((wallet) =>
        wallet.assets.find((token) => token.publicKey === tokenPublicKey)
    );
    if (theWallet !== -1) {
        return theWallet;
    } else {
        throw new InvalidAddress();
    }
};

const findTokenInWallet = (tokenPublicKey) => {
    const indexOfWallet = findWalletByToken(tokenPublicKey);
    const token = db.wallets[indexOfWallet].assets.findIndex((token) => token.publicKey == tokenPublicKey);
    return token;
};

const validateBalance = (tokenPublicKey, tokenBalance) => {
    const wallet = findWalletByToken(tokenPublicKey);
    const token = findTokenInWallet(tokenPublicKey);
    if (db.wallets[wallet].assets[token].balance < tokenBalance) throw new InvalidBalance();
};

const validateTokenInWallet = (indexOfWallet, tokenContractAddress) => {
    const token = db.wallets[indexOfWallet].assets.find((token) => token.contractAddress == tokenContractAddress);
    if (token === undefined) {
        return undefined;
    } else {
        throw new ExistingToken();
    }
};

module.exports = {
    findWalletByToken,
    findTokenInWallet,
    validateBalance,
    validateTokenInWallet,
};
