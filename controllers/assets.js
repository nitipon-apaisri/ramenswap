const assetsModel = require("../models/assets");

const getAllAssets = async (req, res, next) => {
    const assets = assetsModel.getAllAssets();
    try {
        res.json({ assets: assets });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllAssets,
};
