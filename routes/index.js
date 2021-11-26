const { Router } = require("express");
const walletController = require("../controllers/wallet");
const router = new Router();

router.get("/wallets", walletController.getWallets);
router.post("/wallets/create", walletController.createWallet);

module.exports = router;
