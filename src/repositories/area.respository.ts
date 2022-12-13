import { getQueryManager } from "../core/dataLayes/manager";
import { Area } from "../entity/area.entity";
import { Slug } from "../entity/slug.entity";

class AreaRepository {
  async getAreaBySlug(areaSlug: string) {
    const AREA = await getQueryManager()
      .createQueryBuilder(Slug, "slug")
      .select(["area"])
      .innerJoin(Area, "area", "area.id = slug.sluggable_id")
      .where("slug = :areaSlug", { areaSlug })
      .andWhere("sluggable_type = 'Area'")
      .getRawOne();
    return AREA;
  }
}

export default AreaRepository;
