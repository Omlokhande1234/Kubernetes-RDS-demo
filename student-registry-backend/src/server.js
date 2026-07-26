require("dotenv").config();

const app = require("./app.js");
const sequelize = require("./config/database.js");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("✅ Connected to PostgreSQL");

        await sequelize.sync();

        console.log("✅ Database Synced");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
    }
}

startServer();