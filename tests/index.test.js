const supertest = require("supertest");
const app = require("../app.js");
const wallets = require("../models/wallet.js");
const db = require("../database/wallets");
const transactions = require("../models/transactions.js");
const request = supertest(app);

describe("Test all the wallet features and api:s", () => {
    test("It should return total of the wallets", () => {
        const totalWallets = wallets.getWallets();
        expect(totalWallets).toBe(2);
    });
    test("It should return eth address from the wallet", () => {
        const ethAddress = wallets.getWalletByEthAddress("0xETH");
        expect("0xETH").toBe(ethAddress.assets.coins[0].address);
    });
    test("It should return the wallet information as an object", () => {
        const walletInfo = wallets.getTheWalletInformationByEthAddress();
        expect(walletInfo).toBe(db.mockDataWallets[0]);
    });
    test("It should return amount of stable coin", () => {
        const swapToken = transactions.swappingEthToStableCoin("0xETH", 200);
        expect(swapToken).toBe(200);
    });
});
