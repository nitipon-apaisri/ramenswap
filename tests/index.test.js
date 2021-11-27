const supertest = require("supertest");
const app = require("../app.js");
const wallets = require("../models/wallet.js");
const db = require("../database/wallets");
const transactions = require("../models/transactions.js");
const utils = require("../utils");
const request = supertest(app);

describe("Test all the wallet features and api:s", () => {
    test("It should return total of the wallets", () => {
        const totalWallets = wallets.getWallets();
        expect(totalWallets).toBe(2);
    });
    test("It should return token address from the wallet", () => {
        const theWallet = wallets.getAWalletByTokenAddress("0xETH");
        const indexOfToken = utils.findTokenInWallet("0xETH");
        expect("0xETH").toBe(theWallet.assets[indexOfToken].address);
    });
    test("It should return the wallet information as an object", () => {
        const walletInfo = wallets.getAWalletByTokenAddress("0xETH");
        expect(walletInfo).toBe(db.wallets[0]);
    });
});

describe("Test akk the transaction features and api:s", () => {
    test("It should return an amount of swapping token amount", () => {
        const swapToken = transactions.swapATokenToAnotherToken("0xETH", "0xSHIB", 100);
        expect(swapToken).toBe(100);
    });
    test("It should return an amount of sending token amount", () => {
        const swapToken = transactions.sendATokenToAnotherWallet("0xETH", "0xETH2", 100);
        expect(swapToken).toBe(1100);
    });
});
