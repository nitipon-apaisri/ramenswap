const wallets = [];
const sensitiveWalletInfo = [];

const mock = [
    {
        assets: [
            {
                symbol: "ETH",
                name: "Ethereum",
                contractAddress: "0x",
                balance: 1000,
                publicKey: "0xETH",
                privateKey: "0xETHP",
            },
            {
                symbol: "USDT",
                name: "US Dollar Tether",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: "0xUSDT",
                privateKey: "0xUSDTP",
            },
        ],
    },
    {
        assets: [
            {
                symbol: "ETH",
                name: "Ethereum",
                contractAddress: "0x",
                balance: 1000,
                publicKey: "0xETH2",
                privateKey: "0xETHP2",
            },
            {
                symbol: "USDT",
                name: "US Dollar Tether",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: "0xUSDT2",
                privateKey: "0xUSDTP2",
            },
        ],
    },
];

module.exports = {
    wallets,
    sensitiveWalletInfo,
    mock,
};
