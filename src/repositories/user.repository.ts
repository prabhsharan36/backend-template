// import { getDBQueryManager } from "../core/dataLayes/transaction";
// import { User } from "../entity/User";

// type UserDTO = {
//     id: string,
//     name: string,
// };

// class UserRepository {
//     getUserObject(user: User | null): UserDTO | null {
//         if (!user) {
//             return null;
//         }
//         return {
//             id: user.id,
//             name: user.name
//         };
//     }

//     async getById(id: string): Promise<UserDTO | null> {
//         const user = await getDBQueryManager()
//             .createQueryBuilder(User, 'user')
//             .where('user.id = :id', { id })
//             .getOne();

//         return this.getUserObject(user);
//     }
// }

// export default UserRepository;