import config from "./config";
import express from "express";
import loader from "./loaders";
import Logger from "./loaders/logger";
import "reflect-metadata"
async function startServer() {
  const app = express();

  await loader({ app });
  app
    .listen(config.port, () => {
      Logger.info(`🛡️ Server listening on port: ${config.port}`);
    })
    .on("error", (err) => {
      if (err) {
        Logger.error("Error Occured: ", err);
        process.exit(1);
      }
    });
}

startServer();
