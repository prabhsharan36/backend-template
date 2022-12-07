// import { AppDataSource } from "../loaders/dataSource";
// import { Request, Response } from "express";
// import { Specialization } from "../entity/specialization.entity";
// import { container } from "../loaders/container";
// import { internalError } from "../utils/responses.util";

// class FacilityController {
//   protected validatePageSlugs = container.cradle.validatePageTypeAndSlugs;

//   constructor() {
//     this.listing = this.listing.bind(this);
//   }

//   protected validationRules() {
//     return {
//       hospital_india: {
//         sluggable_types: [],
//       },
//       clinic_india: {
//         sluggable_types: [],
//       },
//       category_india_listing: {
//         sluggable_types: ["Category"],
//         with_sluggable: true,
//       },
//       clinic_category_india_listing: {
//         sluggable_types: ["Category"],
//         with_sluggable: true,
//       },
//       hospital_city_listing: {
//         sluggable_types: ["City"],
//         with_sluggable: true,
//       },
//       clinic_city_listing: {
//         sluggable_types: ["City"],
//         with_sluggable: true,
//       },
//       hospital_area_listing: {
//         sluggable_types: ["Area", "City"],
//         with_sluggable: true,
//       },
//       clinic_area_listing: {
//         sluggable_types: ["Area", "City"],
//         with_sluggable: true,
//       },
//       hospital_state_listing: {
//         sluggable_types: ["State"],
//         with_sluggable: true,
//       },
//       clinic_state_listing: {
//         sluggable_types: ["State"],
//         with_sluggable: true,
//       },
//       category_city_listing: {
//         sluggable_types: ["Category", "City"],
//         with_sluggable: true,
//       },
//       clinic_category_city_listing: {
//         sluggable_types: ["Category", "City"],
//         with_sluggable: true,
//       },
//       category_state_listing: {
//         sluggable_types: ["Category", "State"],
//         with_sluggable: true,
//       },
//       clinic_category_state_listing: {
//         sluggable_types: ["Category", "State"],
//         with_sluggable: true,
//       },
//       hospital_country_listing: {
//         sluggable_types: ["Country"],
//         with_sluggable: true,
//       },
//       clinic_country_listing: {
//         sluggable_types: ["Country"],
//         with_sluggable: true,
//       },
//       category_country_listing: {
//         sluggable_types: ["Category", "Country"],
//         with_sluggable: true,
//       },
//       clinic_category_country_listing: {
//         sluggable_types: ["Category", "Country"],
//         with_sluggable: true,
//       },
//     };
//   }

//   async listing(req: Request, res: Response) {
//     try {
//       const PageType = await this.validatePageSlugs.execute(
//         req.params,
//         this.validationRules()
//       );
//     } catch (err: any) {
//       return err.handle?.(res) || internalError(res, err.message);
//     }
//   }
// }

// export default FacilityController;
