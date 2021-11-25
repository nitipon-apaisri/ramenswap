const app = require("./app");

const start = (port) => {
    try {
        app.listen(port, () => {
            console.log(`This app is running on port ${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

start(4200);
