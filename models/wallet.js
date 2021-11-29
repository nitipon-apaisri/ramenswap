const randomstring = require("randomstring");
const db = require("../database/wallets");
const utils = require("../utils");
const randomWords = require("random-words");
const { InvalidBody } = require("../errors/index");

const walletModel = (ethPublicKey, ethPrivateKey, usdtPublicKey, usdtPrivateKey, recoveryPhrase) => {
    const publicWalletInfo = {
        assets: [
            {
                name: "Ethereum",
                symbol: "ETH",
                contractAddress: "",
                balance: 0,
                publicKey: ethPublicKey,
            },
            {
                fullName: "US Dollar Tether",
                name: "USDT",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: usdtPublicKey,
            },
        ],
        supportNetworks: ["ETH"],
    };

    const sensitiveInfo = {
        assets: [
            {
                fullName: "Ethereum",
                name: "Ethereum",
                contractAddress: "",
                balance: 0,
                publicKey: ethPublicKey,
                privateKey: ethPrivateKey,
            },
            {
                fullName: "US Dollar Tether",
                name: "USDT",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: usdtPublicKey,
                privateKey: usdtPrivateKey,
            },
        ],
        recoveryPhrase: recoveryPhrase,
        supportNetworks: ["ETH"],
    };
    db.wallets.push(publicWalletInfo);
    db.sensitiveWalletInfo.push(sensitiveInfo);
};

const tokenModel = (tokenContractAddress, tokenFullName, tokenName, publicKey, privateKey) => {
    if (privateKey === undefined) {
        const token = {
            fullName: tokenFullName,
            name: tokenName,
            contractAddress: tokenContractAddress,
            balance: 0,
            publicKey: publicKey,
        };
        return token;
    } else {
        const token = {
            fullName: tokenFullName,
            name: tokenName,
            contractAddress: tokenContractAddress,
            balance: 0,
            publicKey: publicKey,
            privateKey: privateKey,
        };
        return token;
    }
};

const createWallet = () => {
    const ethPublicKey = `0x${randomstring.generate(40)}`;
    const usdtPublicKey = `0x${randomstring.generate(40)}`;
    const ethPrivateKey = `0x${randomstring.generate(40)}`;
    const usdtPrivateKey = `0x${randomstring.generate(40)}`;
    const recoveryPhrase = randomWords(12);
    walletModel(ethPublicKey, ethPrivateKey, usdtPublicKey, usdtPrivateKey, recoveryPhrase);
    return "Wallet created";
};

const getWallets = () => {
    return db.wallets;
};

const getAWalletByTokenPublicKey = (publicKey) => {
    const indexOfWallet = utils.findWalletByToken(publicKey);
    const wallet = db.wallets[indexOfWallet];
    return wallet;
};

const addToken = (ethPublicKey, tokenContractAddress, tokenFullName, tokenName) => {
    //prettier-ignore
    if(ethPublicKey === undefined || tokenContractAddress === undefined || tokenFullName === undefined || tokenName === undefined) throw new InvalidBody
    const indexOfwallet = utils.findWalletByToken(ethPublicKey);
    const validateTokenInWallet = utils.validateTokenInWallet(indexOfwallet, tokenContractAddress);
    if (validateTokenInWallet === undefined) {
        const tokenPublicKey = `0x${randomstring.generate(40)}`;
        const tokenPrivatekey = `0x${randomstring.generate(40)}`;
        const publicTokenInfo = tokenModel(tokenContractAddress, tokenFullName, tokenName, tokenPublicKey);
        //prettier-ignore
        const sensitiveTokenInfo = tokenModel(tokenContractAddress, tokenFullName, tokenName, tokenPublicKey, tokenPrivatekey);
        db.wallets[indexOfwallet].assets.push(publicTokenInfo);
        db.sensitiveWalletInfo[indexOfwallet].assets.push(sensitiveTokenInfo);
        return "Token added";
    }
};
module.exports = {
    getWallets,
    getAWalletByTokenPublicKey,
    createWallet,
    addToken,
};
