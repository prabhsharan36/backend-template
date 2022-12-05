// import { Page } from "../entity/page.entity";
import { AppDataSource } from "../loaders/dataSource";
// import PageController from "../baseClasses/PageController";
import { Request, Response } from "express";
// import PageValidation from "../interfaces/pageValidation.interface";
import { Specialization } from "../entity/specialization.entity";
import DoctorService from "../services/doctor.service";
// import { container } from "../loaders/container";

class DoctorController {
  // protected doctorService = container.resolve("doctorService");
  // constructor({ doctorService }) {
  //   this.doctorService = doctorService;
  // }

  // TODO (From public to protected)
  public slugsToValidate(req: Request) {
    return req.params;
  }

  public validationRules() {
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

  // constructor(req: Request, res: Response) {
  //   super(req, res, true); // validation = true
  // }

  static async getAreaDoctorIds(req: Request, res: Response) {
    const doctorIds = await DoctorService.getAreaDoctorIds(
      parseInt(req?.query?.areaId as string, 10),
      parseInt(req?.query?.serviceId as string, 10)
    );

    res.status(200).json(doctorIds);
  }

  static async getListingPages(req: Request, res: Response) {
    const doctorIds = await DoctorService.getListingPages(
      parseInt(req?.query?.doctorId as string, 10)
    );

    res.status(200).json(doctorIds);
  }
}

export default DoctorController;
