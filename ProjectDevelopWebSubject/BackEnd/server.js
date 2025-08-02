const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
const ensureAdminAccountExists = require("./app/init/admin.init");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to database!");
    await ensureAdminAccountExists();
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to database", error);
    process.exit();
  }
}

startServer();
