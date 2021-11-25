const wallets = [];
const mockDataWallets = [
    {
        id: 1,
        assets: [
            {
                name: "Ethereum",
                address: "0xETH",
                balance: 1000,
            },
            {
                name: "USDT",
                address: "0xUSDT",
                balance: 0,
            },
            {
                name: "Shiba Inu",
                address: "0xSHIB",
                balance: 0,
            },
        ],
        // recoveryPhrase: [],
        supportNetworks: ["ETH"],
    },
    {
        id: 2,
        assets: [
            {
                name: "Ethereum",
                address: "0xETH2",
                balance: 1000,
            },
            {
                name: "USDT",
                address: "0xUSDT2",
                balance: 0,
            },
            {
                name: "Shiba Inu",
                address: "0xSHIB2",
                balance: 0,
            },
        ],
        // recoveryPhrase: [],
        supportNetworks: ["ETH"],
    },
];

module.exports = {
    mockDataWallets,
    wallets,
};
