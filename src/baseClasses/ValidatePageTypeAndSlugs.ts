import { Slug } from "../entity/slug.entity";
import { AppDataSource } from "../loaders/dataSource";
import _ from "lodash";
// import errorHandler from "../middlewares/errorHandler";
// import { NotFound } from "../exceptions";
import { Response } from "express";

class ValidatePageTypeAndSlugs {
  protected isValid = false;
  protected pageRulesObj: any;
  protected pageRulesArr: any;
  protected slugValues: any;
  protected withSluggable = false;
  protected res: any;
  public slugs: any;
  public pageType: any;

  constructor(slugValues: any, pageRules: any, res: Response) {
    this.slugValues = slugValues;
    this.pageRulesObj = pageRules;
    this.res = res;
  }

  public async run() {
    const result = await this.execute();
    return result;
  }

  public async execute() {
    /* Fetch slugs from DB in order */
    await AppDataSource.createQueryBuilder()
      .select("slugs")
      .from(Slug, "slugs")
      .where("slug IN(:slugs)", { slugs: Object.values(this.slugValues) })
      .orderBy("slugs.sluggable_type", "DESC")
      .getMany()
      .then((slugs) => {
        this.validateSlugs(slugs);
        this.validateCallback(slugs);
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.isValid && this.pageRulesObj[this.pageType].with_sluggable) {
      // TODO
      // 		$slugs->load('sluggable');
    }
    return {
      pageType: this.pageType,
    };
  }

  protected validateSlugs(slugs: any) {
    if (slugs.length > 0) {
      let sluggableTypes = _.map(slugs, "sluggable_type");

      for (let pageType in this.pageRulesObj) {
        const rules = this.pageRulesObj[pageType];

        if (rules.sluggable_types.length === sluggableTypes.length) {
          /**
           * When no slugs are supposed to be checked, i.e. the url doesn't have slugs.
           * Ex - Hospitals in India page, has url = '/hospitals' which has not slug to be matched.
           */
          if (
            rules.sluggable_types.length === 0 &&
            sluggableTypes.length === 0
          ) {
            this.isValid = true;
          } else {
            let i = 0;
            let match = true;

            while (match && i < rules.sluggable_types.length) {
              match = rules.sluggable_types[i] === sluggableTypes[i];
              i++;
            }
            this.isValid = match;
          }
        }

        if (this.isValid) {
          this.pageType = pageType;
          break;
        }
      }
    }
  }

  protected async validateCallback(slugs: any) {
    if (this.isValid) {
      const Closure = this.pageRulesObj[this.pageType]?.callback_validation;
      /**
       * sometimes we don't provide 'callback_validation' function
       * in 'pageRulesObj'
       */
      this.isValid = Closure instanceof Function ? await Closure(slugs) : true;
      if (!this.isValid) {
        delete this.pageRulesObj[this.pageType];
        this.execute();
      }
    }
  }

  public fails() {
    return !this.isValid;
  }
}

export default ValidatePageTypeAndSlugs;
