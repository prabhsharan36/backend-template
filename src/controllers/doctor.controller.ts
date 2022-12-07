import { AppDataSource } from "../loaders/dataSource";
import { Request, Response } from "express";
import { Specialization } from "../entity/specialization.entity";
import { container } from "../loaders/container";
// import { internalError } from "../utils/responses.util";
class DoctorController {
  protected doctorService = container.cradle.doctorService;
  protected validatePageSlugs = container.cradle.validatePageTypeAndSlugs;

  constructor() {
    // this.listing = this.listing.bind(this);
    this.getListingPages = this.getListingPages.bind(this);
    this.getAreaDoctorIds = this.getAreaDoctorIds.bind(this);
  }

  protected validationRules() {
    return {
      service_country: {
        sluggable_types: ["Service", "Country"],
        with_sluggable: true,
      },
      service_city: {
        sluggable_types: ["Service", "City"],
        with_sluggable: true,
      },
      service_area: {
        sluggable_types: ["Service", "City", "Area"],
        with_sluggable: true,
      },
      specialization_country: {
        sluggable_types: ["Specialization", "Country"],
        with_sluggable: true,
        async callback_validation(slugs: any) {
          const specialization = await AppDataSource.createQueryBuilder()
            .select("specializations.has_country_page")
            .from(Specialization, "specializations")
            .where({ id: slugs[0].sluggable_id })
            .getOne();
          return specialization?.has_country_page === 1 || false;
        },
      },
      specialization_city: {
        sluggable_types: ["Specialization", "City"],
        with_sluggable: true,
      },
      specialization_area: {
        sluggable_types: ["Specialization", "City", "Area"],
        with_sluggable: true,
      },
    };
  }

  // async listing(req: Request, res: Response) {
  //   try {
  //     const PageType = await this.validatePageSlugs.execute(
  //       req.params,
  //       this.validationRules()
  //     );
  //   } catch (err: any) {
  //     return err.handle?.(res) || internalError(res, err.message);
  //   }
  // }

  async getAreaDoctorIds(req: Request, res: Response) {
    const doctorIds = await this.doctorService.getAreaDoctorIds(
      parseInt(req?.query?.areaId as string, 10),
      parseInt(req?.query?.serviceId as string, 10),
      parseInt(req?.query?.doctorId as string, 10)
    );
    res.status(200).json(doctorIds);
  }

  async getListingPages(req: Request, res: Response) {
    const doctorIds = await this.doctorService.getListingPages(
      parseInt(req?.query?.doctorId as string, 10)
    );
    res.status(200).json(doctorIds);
  }
}

export default DoctorController;
