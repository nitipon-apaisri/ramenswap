const wallets = [];
const sensitiveWalletInfo = [];

const mock = [
    {
        assets: [
            {
                name: "Ethereum",
                symbol: "Ethereum",
                contractAddress: "0x",
                balance: 1000,
                publicKey: "0xETH",
                privateKey: "0xETHP",
            },
            {
                name: "US Dollar Tether",
                symbol: "USDT",
                contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
                balance: 0,
                publicKey: "0xUSDT",
                privateKey: "0xUSDTP",
            },
        ],
    },
];

module.exports = {
    wallets,
    sensitiveWalletInfo,
    mock,
};
