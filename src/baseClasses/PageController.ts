import { Page } from "../entity/page.entity";
import { Request, Response } from "express";
import ValidatePageTypeAndSlugs from "../middlewares/validatePageTypeAndSlugs.middleware";
import errorHandler from "../middlewares/errorHandler";
import { NotFound } from "../exceptions";

class PageController {
  protected isMobile = false;
  protected page!: Page;
  public validation = false;
  protected slugs: any;
  protected pageType = "default";

  constructor(req: Request, res: Response, validation: boolean) {
    this.isMobile = req.get("X-DEVICE-TYPE") === "mobile" ? true : false;
    this.validation = validation;
    this.run(req, res); // doing this for running async function
  }

  protected async run(req: Request, res: Response) {
    if (this.validation) {
      this.setValidSlugsAndPageType(req, res);
    }
  }
  protected slugsToValidate(_req: Request) {
    /**
     * this function will never run,
     * this function will be overwritten by the
     * child class and that function will be called
     * in "setValidSlugsAndPageType" function below
     */
  }

  protected validationRules() {
    /**
     * this function will never run,
     * this function will be overwritten by the
     * child class and that function will be called
     * in "setValidSlugsAndPageType" function below
     */
  }
  protected async setValidSlugsAndPageType(req: Request, res: Response) {
    this.slugs = this.slugsToValidate(req);
    const Validator = new ValidatePageTypeAndSlugs(
      this.slugs,
      this.validationRules(),
      res
    );
    const result = await Validator.run();
    this.pageType = result?.pageType;
    if (Validator.fails()) {
      errorHandler(new NotFound(), res); // return 404
    } else {
      this.pageType = result?.pageType;
    }
  }
}

export default PageController;
