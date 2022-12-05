import { Page } from "../entity/page.entity";
import { AppDataSource } from "../loaders/dataSource";
import PageController from "../baseClasses/PageController";
import { Request, Response } from "express";
import PageValidation from "../interfaces/pageValidation.interface";
// import { Specialization } from "../entity/specialization.entity";

class CostRepository extends PageController implements PageValidation {
  // TODO (From public to protected)
  public slugsToValidate(req: Request) {
    return req.params;
  }

  public validationRules() {
    return {
      all: {
        sluggable_types: [],
        with_sluggable: false,
      },
      country: {
        sluggable_types: ["Country"],
        with_sluggable: true,
      },
    };
  }

  constructor(req: Request, res: Response) {
    super(req, res, true); // validation = true
    // console.log(this.pageType);
    
  }

  async listing(_req: any, res: any) {
    try {
      const a = await AppDataSource.createQueryBuilder()
        .select("pages")
        .from(Page, "pages")
        .where({ id: 1 })
        .getOne();
      res.status(200).send({ data: a });
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  }
}

export default CostRepository;
