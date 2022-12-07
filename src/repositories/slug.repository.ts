import { getQueryManager } from "../core/dataLayes/manager";
import { Slug } from "../entity/slug.entity";

class SlugRepository {
  async getSlugsBySlugs(slugs: { [key: string]: string }) {
    const SLUGS = await getQueryManager()
      .createQueryBuilder(Slug, "slugs")
      .select("slugs")
      .where("slug IN(:slugs)", { slugs: Object.values(slugs) })
      .orderBy("slugs.sluggable_type", "DESC")
      .getMany();

    return SLUGS;
  }
}

export default SlugRepository;
