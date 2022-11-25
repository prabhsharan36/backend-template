import "reflect-metadata"
import _ from "lodash";
import { DataSource } from "typeorm"
import { Page } from "../entity/page.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: _.toNumber(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    logging: false,
    entities: [Page],
    migrations: [],
    subscribers: [],
});

