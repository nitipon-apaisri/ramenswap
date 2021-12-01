const dbAssets = require("../database/assets");

const getAllAssets = () => {
    return dbAssets.assets;
};

module.exports = {
    getAllAssets,
};
