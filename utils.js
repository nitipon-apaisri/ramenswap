const db = require("./database/wallets");

const findWalletByToken = (address) => {
    const theWallet = db.mockDataWallets.findIndex((wallet) =>
        wallet.assets.find((wallet) => wallet.address == address)
    );
    return theWallet;
};

const findTokenInWallet = (tokenAddress) => {
    const indexOfWallet = findWalletByToken(tokenAddress);
    const token = db.mockDataWallets[indexOfWallet].assets.findIndex(
        (eth) => eth.address == tokenAddress
    );
    return token;
};

module.exports = {
    findWalletByToken,
    findTokenInWallet,
};
