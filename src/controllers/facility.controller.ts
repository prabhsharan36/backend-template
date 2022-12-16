import { Request, Response } from "express";
import { container } from "../loaders/container";
import { internalError } from "../utils/responses.util";
class FacilityController {
  protected validatePageSlugs = container.cradle.validatePageTypeAndSlugs;
  protected categoryRepo = container.cradle.categoryRepo;
  protected areaRepo = container.cradle.areaRepo;
  protected facilityService = container.cradle.facilityService;
  constructor() {
    this.listing = this.listing.bind(this);
  }

  protected validationRules() {
    return {
      hospital_india: {
        sluggable_types: [],
        callback_validation: async (
          originalUrl: string,
          _slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          return {
            isValid: IsUrlContainHospital,
          };
        },
      },
      clinic_india: {
        sluggable_types: [],
        callback_validation: async (
          originalUrl: string,
          _slugs: { slug: string }
        ) => {
          const IsUrlContainClinic =
            originalUrl.indexOf("/clinics") > -1 ? true : false;
          return {
            isValid: IsUrlContainClinic,
          };
        },
      },
      hospital_category_india_listing: {
        sluggable_types: ["Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          if (slugs?.[0]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs[0]?.slug
            );

            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Hospital" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainHospital && IsCategoryHasListingType,
              category,
            };
          }
          return;
        },
      },
      clinic_category_india_listing: {
        sluggable_types: ["Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainClinic =
            originalUrl.indexOf("/clincs") > -1 ? true : false;
          if (slugs?.[0]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs?.[0]?.slug
            );
            
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Clinic" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainClinic && IsCategoryHasListingType,
              category: slugs[0],
            };
          }
          return;
        },
      },
      hospital_city_listing: {
        sluggable_types: ["City"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          return {
            isValid: IsUrlContainHospital,
            city_state_country: slugs[0],
          };
        },
      },
      clinic_city_listing: {
        sluggable_types: ["City"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainClinic =
            originalUrl.indexOf("/clinics") > -1 ? true : false;
          return {
            isValid: IsUrlContainClinic,
            city_state_country: slugs[0],
          };
        },
      },
      hospital_area_listing: {
        sluggable_types: ["City", "Area"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const area = await this.areaRepo.getAreaBySlug(slugs?.[1]?.slug);

          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          return {
            isValid: IsUrlContainHospital,
            city_state_country: slugs[0],
            area,
          };
        },
      },
      clinic_area_listing: {
        sluggable_types: ["City", "Area"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const area = await this.areaRepo.getAreaBySlug(slugs?.[1]?.slug);
          const IsUrlContainClinic =
            originalUrl.indexOf("/clinics") > -1 ? true : false;
          return {
            isValid: IsUrlContainClinic,
            city_state_country: slugs[0],
            area,
          };
        },
      },
      hospital_state_listing: {
        sluggable_types: ["State"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          _slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          return IsUrlContainHospital;
        },
      },
      clinic_state_listing: {
        sluggable_types: ["State"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          _slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/clinics") > -1 ? true : false;
          return IsUrlContainHospital;
        },
      },
      hospital_country_listing: {
        sluggable_types: ["Country"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          return {
            isValid: IsUrlContainHospital,
            city_state_country: slugs[0],
          };
        },
      },
      clinic_country_listing: {
        sluggable_types: ["Country"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainClinic =
            originalUrl.indexOf("/clinics") > -1 ? true : false;
          return {
            isValid: IsUrlContainClinic,
            city_state_country: slugs[0],
          };
        },
      },
      hospital_category_city_listing: {
        sluggable_types: ["City", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs?.[1]?.slug
            );
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Hospital" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainHospital && IsCategoryHasListingType,
              city_state_country: slugs[0],
              category,
            };
          }
          return;
        },
      },
      clinic_category_city_listing: {
        sluggable_types: ["City", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/clincs") > -1 ? true : false;
          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs?.[1]?.slug
            );
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Clinic" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return IsUrlContainHospital && IsCategoryHasListingType;
          }
          return;
        },
      },
      hospital_category_state_listing: {
        sluggable_types: ["State", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;
          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs?.[1]?.slug
            );
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Hospital" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainHospital && IsCategoryHasListingType,
              city_state_country: slugs[0],
              category,
            };
          }
          return {
            isValid: false,
          };
        },
      },
      clinic_category_state_listing: {
        sluggable_types: ["State", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/clincs") > -1 ? true : false;
          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs?.[1]?.slug
            );
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Clinic" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainHospital && IsCategoryHasListingType,
              city_state_country: slugs[0],
              category,
            };
          }
          return {
            isValid: false,
          };
        },
      },
      hospital_category_country_listing: {
        sluggable_types: ["Country", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/hospitals") > -1 ? true : false;

          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs[1]?.slug
            );

            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Hospital" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return {
              isValid: IsUrlContainHospital && IsCategoryHasListingType,
              city_state_country: slugs[0],
              category,
            };
          }
          throw new Error("Second Element in array should be of type Category");
        },
      },
      clinic_category_country_listing: {
        sluggable_types: ["Country", "Category"],
        with_sluggable: true,
        callback_validation: async (
          originalUrl: string,
          slugs: { slug: string }
        ) => {
          const IsUrlContainHospital =
            originalUrl.indexOf("/clincs") > -1 ? true : false;
          if (slugs[1]?.sluggable_type === "Category") {
            // Second element in slugs array will always be category
            const category = await this.categoryRepo.getCategoryBySlug(
              slugs[1]?.slug
            );
            const IsCategoryHasListingType =
              category?.category_facility_listing_type === "Clinic" ||
              category?.category_facility_listing_type === "Both"
                ? true
                : false;
            return IsUrlContainHospital && IsCategoryHasListingType;
          }
          throw new Error("Second Element in array should be of type Category");
        },
      },
    };
  }

  async listing(req: Request, res: Response) {
    try {
      const { pageType, category, city_state_country, area } =
        await this.validatePageSlugs.execute(
          req.originalUrl,
          req.params,
          this.validationRules()
        );
      // console.log(req);

      const result = await this.facilityService.listing({
        pageType,
        category,
        city_state_country,
        area,
      });
      res.status(200).json({ result });
    } catch (err: any) {
      // console.log(err);

      return err.handle?.(res) || internalError(res, err.message);
    }
  }
}

export default FacilityController;
