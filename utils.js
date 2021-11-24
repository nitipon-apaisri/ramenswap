const db = require("./database/wallets");
const findWalletIndex = (address) => {
    const indexOfWallet = db.mockDataWallets.findIndex(
        (wallet) => wallet.assets.coins[0].address == address
    );
    return indexOfWallet;
};

module.exports = {
    findWalletIndex,
};
