const db = require("./database/wallets");
const { InvalidBalance, InvalidAddress, ExistingToken } = require("./errors/index");
const findWalletByTokenPublicKey = (tokenPublicKey) => {
    const theWallet = db.mock.findIndex((wallet) => wallet.assets.find((token) => token.publicKey === tokenPublicKey));
    if (theWallet !== -1) {
        return theWallet;
    } else {
        throw new InvalidAddress();
    }
};
const findWalletByTokenContractAddress = (tokenContractAddress) => {
    const theWallet = db.mock.findIndex((wallet) =>
        wallet.assets.find((token) => token.contractAddress === tokenContractAddress)
    );
    if (theWallet !== -1) {
        return theWallet;
    } else {
        throw new InvalidAddress();
    }
};

const validateTokenInWallet = (indexOfWallet, tokenContractAddress) => {
    const token = db.mock[indexOfWallet].assets.find((token) => token.contractAddress == tokenContractAddress);
    if (token === undefined) {
        return undefined;
    } else {
        return 0;
    }
};

const findTokenInWalletByPublicKey = (indexOfWallet, tokenPublicKey) => {
    const token = db.mock[indexOfWallet].assets.findIndex((token) => token.publicKey == tokenPublicKey);
    return token;
};
const findTokenInWalletByContractAddress = (indexOfWallet, tokenContractAddress) => {
    const token = db.mock[indexOfWallet].assets.findIndex((token) => token.contractAddress == tokenContractAddress);
    return token;
};

const validateBalance = (indexOfWallet, indexOfOriginToken, tokenBalance) => {
    if (db.mock[indexOfWallet].assets[indexOfOriginToken].balance < tokenBalance) throw new InvalidBalance();
};

module.exports = {
    findWalletByTokenPublicKey,
    findWalletByTokenContractAddress,
    findTokenInWalletByPublicKey,
    findTokenInWalletByContractAddress,
    validateBalance,
    validateTokenInWallet,
};
