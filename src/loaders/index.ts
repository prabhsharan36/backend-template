import { Application } from "express";
import expressLoader from "./express";
import Logger from "./logger";
import { AppDataSource } from "./dataSource";

export default async ({ app }: { app: Application }) => {
  Logger.info(`The current environment is in ${process.env.NODE_ENV} mode`);

  /**
   * Initializing TypeORM Connection
   */
  await AppDataSource.initialize()
    .then(() => {
      Logger.info("✌️ DB loaded and connected!");
    })
    .catch((err) => {
      Logger.error("ERROR CONNECTING WITH DB => ", err);
      process.exit(0);
    });

  /**
   * Express App loading
   */
  expressLoader({ app });
  Logger.info("✌️ Express loaded");
};
