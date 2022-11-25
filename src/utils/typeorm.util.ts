import { AppDataSource } from "../loaders/dataSource";

export function getManager() {
    return AppDataSource.manager;
}