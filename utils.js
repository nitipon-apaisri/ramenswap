const db = require("./database/wallets");
const findWalletIndex = (address) => {
    const indexOfWallet = db.mockDataWallets.findIndex(
        (wallet) => wallet.assets.coins[0].address == address
    );
    return indexOfWallet;
};
const findTokenIndexOfWallet = (ethAddress, tokenAddress) => {
    const walletIndex = findWalletIndex(ethAddress);
    const indexOfToken = db.mockDataWallets[walletIndex].assets.tokens.findIndex((r) => {
        if (r.address == tokenAddress) {
            return r;
        }
    });
    return indexOfToken;
};
module.exports = {
    findWalletIndex,
    findTokenIndexOfWallet,
};
