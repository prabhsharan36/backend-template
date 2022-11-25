// import { getDBQueryManager } from "../core/dataLayes/transaction";
import { Page } from "../entity/Page";
import { AppDataSource } from "../loaders/dataSource";

class UserRepository {
  async getUserObject(_req: any, res: any) {
    try {
      const a = await AppDataSource.createQueryBuilder()
        .select("pages")
        .from(Page, "pages")
        .where({ id: 1 })
        .getOne();
      console.log(a);
      res.send(200, {data: a});
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  }
}

export default UserRepository;
