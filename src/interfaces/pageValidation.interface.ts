import { Request } from "express";

interface PageValidation {
  slugsToValidate(res: Request): any;
  validationRules(): any;
}
export default PageValidation
