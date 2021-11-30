const randomstring = require("randomstring");
const db = require("../database/wallets");
const utils = require("../utils");
const randomWords = require("random-words");
const { InvalidBody } = require("../errors/index");

const walletModel = (ethPublicKey, ethPrivateKey, usdtPublicKey, usdtPrivateKey, recoveryPhrase) => {
    const publicWalletInfo = {
        assets: [
            {
                symbol: "ETH",
                name: "Ethereum",
                color: "#3C3C3D",
                iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                contractAddress: "0x",
                balance: 0,
                publicKey: ethPublicKey,
            },
            {
                symbol: "USDT",
                name: "Tether US Dollar",
                color: "#22a079",
                iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg",
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
                symbole: "ETH",
                name: "Ethereum",
                color: "#3C3C3D",
                iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
                contractAddress: "0x",
                balance: 0,
                publicKey: ethPublicKey,
                privateKey: ethPrivateKey,
            },
            {
                symbol: "USDT",
                name: "Tether US Dollar",
                color: "#22a079",
                iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg",
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

const tokenModel = (tokenContractAddress, tokenName, tokenSymbol, color, iconUrl, publicKey, privateKey) => {
    if (privateKey === undefined) {
        const token = {
            symbol: tokenSymbol,
            name: tokenName,
            color: color,
            iconUrl: iconUrl,
            contractAddress: tokenContractAddress,
            balance: 0,
            publicKey: publicKey,
        };
        return token;
    } else {
        const token = {
            symbol: tokenSymbol,
            name: tokenName,
            color: color,
            iconUrl: iconUrl,
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
    const indexOfWallet = utils.findWalletByTokenPublicKey(publicKey);
    const wallet = db.wallets[indexOfWallet];
    return wallet;
};

const addToken = (ethPublicKey, tokenContractAddress, tokenName, tokenSymbol, color, iconUrl) => {
    //prettier-ignore
    if(tokenContractAddress === undefined || tokenName === undefined) throw new InvalidBody
    const indexOfwallet = utils.findWalletByTokenPublicKey(ethPublicKey);
    const validateTokenInWallet = utils.validateTokenInWallet(indexOfwallet, tokenContractAddress);
    if (validateTokenInWallet === undefined) {
        const tokenPublicKey = `0x${randomstring.generate(40)}`;
        const tokenPrivatekey = `0x${randomstring.generate(40)}`;
        //prettier-ignore
        const publicTokenInfo = tokenModel(tokenContractAddress, tokenName, tokenSymbol, color, iconUrl, tokenPublicKey);
        //prettier-ignore
        // const sensitiveTokenInfo = tokenModel(tokenContractAddress, tokenName, tokenSymbol, color, iconUrl, tokenPublicKey, tokenPrivatekey);
        db.mock[indexOfwallet].assets.push(publicTokenInfo);
        // db.sensitiveWalletInfo[indexOfwallet].assets.push(sensitiveTokenInfo);
    }
};
module.exports = {
    getWallets,
    getAWalletByTokenPublicKey,
    createWallet,
    addToken,
};
