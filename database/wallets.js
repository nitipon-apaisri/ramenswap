const wallets = [];
const sensitiveWalletInfo = [];

const mock = [
    {
        assets: [
            {
                fullName: "Ethereum",
                name: "Ethereum",
                contractAddress: "",
                balance: 0,
                publicKey: "0xETH",
                privateKey: "0xETHP",
            },
            {
                fullName: "US Dollar Tether",
                name: "USDT",
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
