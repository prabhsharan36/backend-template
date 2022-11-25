// // @ts-nocheck
// import { EntityManager } from "typeorm";
// import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";
// import {getContextManager} from "@railofy/hydra";
// import { AppDataSource } from "../../loaders/dataSource";

// type TransactionContextType = {
//     transactionalEntityManager: EntityManager
// }

// const ContextManager = getContextManager<TransactionContextType>()

// export const useTransaction = ({ isolationLevel = "SERIALIZABLE"}: {isolationLevel?: IsolationLevel}) => {
//     return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(... params: any[])=> Promise<any>>) => {
//         const originalMethod = descriptor.value;
//         descriptor.value = async function () {
//             return executeWithTransaction(isolationLevel,async ()=>{
//                 return originalMethod.apply(this, arguments)
//             })
//         }
//     }
// }

// type TransactionFunction<T> = (t?:EntityManager) => Promise<T>
// export function executeWithTransaction<T>(originalMethod:TransactionFunction<T>):Promise<T>
// export function executeWithTransaction<T>(isolationLevel: IsolationLevel,originalMethod:TransactionFunction<T>):Promise<T>

// export async function executeWithTransaction<T>(isolationLevel: IsolationLevel | TransactionFunction<T>,originalMethod?:TransactionFunction<T>) {

//     if(typeof isolationLevel !== "string"){
//         originalMethod = isolationLevel
//         isolationLevel = "SERIALIZABLE"
//     }

//     const transactionalEntityManager = ContextManager.get("transactionalEntityManager");
//     if(transactionalEntityManager){
//         return originalMethod.call(this, transactionalEntityManager)
//     }else{
//         return getManager().transaction(isolationLevel as IsolationLevel,async (transactionalEntityManager)=> {
//             return ContextManager.run({
//                 transactionalEntityManager,
//             },async ()=>{
//                 return originalMethod.call(this, transactionalEntityManager)
//             })
//         })
//     }
// }

// export const getDBQueryManager = (transactional = true) => {
//     if(!transactional){
//         return AppDataSource.manager
//     }
//     return ContextManager.get("transactionalEntityManager") || AppDataSource.manager
// }