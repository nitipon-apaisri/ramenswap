const { Router } = require("express");
const walletsController = require("../controllers/wallet");
const assetsController = require("../controllers/assets");
const transactionController = require("../controllers/transaction");
const router = new Router();

router.get("/wallets", walletsController.getWallets);
router.get("/wallets/:tokenPublicKey", walletsController.getAWalletByTokenPublicKey);
router.post("/wallets/create", walletsController.createWallet);
router.get("/assets", assetsController.getAllAssets);
router.post("/transactions/swapToken", transactionController.swapToken);
router.get("/transactions", transactionController.allTransactions);
module.exports = router;
