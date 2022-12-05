import { AppDataSource } from "../../loaders/dataSource";

export const getQueryManager = () => {
    return AppDataSource.manager;
}