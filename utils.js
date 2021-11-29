const db = require("./database/wallets");
const { InvalidBalance, InvalidAddress, ExistingToken } = require("./errors/index");
const findWalletByToken = (tokenContractAddress) => {
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

const findTokenInWallet = (tokenContractAddress) => {
    const indexOfWallet = findWalletByToken(tokenContractAddress);
    const token = db.mock[indexOfWallet].assets.findIndex((token) => token.contractAddress == tokenContractAddress);
    return token;
};

const validateBalance = (tokenPublicKey, tokenBalance) => {
    // const wallet = findWalletByToken(tokenPublicKey);
    // const token = findTokenInWallet(tokenPublicKey);
    if (db.mock[0].assets[0].balance < tokenBalance) throw new InvalidBalance();
};

module.exports = {
    findWalletByToken,
    findTokenInWallet,
    validateBalance,
    validateTokenInWallet,
};
