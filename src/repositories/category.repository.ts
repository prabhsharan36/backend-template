import { getQueryManager } from "../core/dataLayes/manager";
import { Categorizable } from "../entity/categorizable.entity";
import { Category } from "../entity/category.entity";
import { Service } from "../entity/service.entity";
import { Slug } from "../entity/slug.entity";

class CategoryRepository {
  async getCategoryBySlug(slug: string) {
    const SLUG = await getQueryManager()
      .createQueryBuilder(Slug, "slug")
      .select(["category"])
      .innerJoin(Category, "category", "category.id = slug.sluggable_id")
      .where("slug = :slug", { slug })
      .andWhere("sluggable_type = 'Category'")
      .getRawOne();
    return SLUG;
  }

  async getCategoryServiceIds(categoryId: number) {
    let ServiceIds = await getQueryManager()
      .createQueryBuilder(Categorizable, "cbl")
      .select(["cbl.categorizable_id AS service_id"])
      .where(
        "cbl.category_id = :categoryId AND cbl.categorizable_type = 'Service'",
        { categoryId }
      )
      .getRawMany();
    ServiceIds = ServiceIds.map((obj) => {
      return obj.service_id;
    });
    return ServiceIds;
  }

  async getCategorySpecializationIds(categoryId: number) {
    let SpecializationIds = await getQueryManager()
      .createQueryBuilder(Categorizable, "cbl")
      .select(["cbl.categorizable_id AS specialization_id"])
      .where(
        "cbl.category_id = :categoryId AND cbl.categorizable_type = 'Specialization'",
        { categoryId }
      )
      .getRawMany();
    SpecializationIds = SpecializationIds.map((obj) => {
      return obj.specialization_id;
    });
    return SpecializationIds;
  }
}

export default CategoryRepository;
