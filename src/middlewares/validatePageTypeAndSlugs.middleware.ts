import _ from "lodash";
import { container } from "../loaders/container";

class ValidatePageTypeAndSlugs {
  protected isValid = false;
  protected pageRulesObj: any;
  protected slugValues: any;
  public slugs: any;
  public pageType: any;
  protected originalUrl: any;
  protected category: any;
  protected city_state_country: any;
  protected area: any;
  protected validated: any;

  protected slugRepo = container.cradle.slugRepo;
  protected notFound = container.cradle.notFound;

  public async execute(
    originalUrl: string,
    slugValues: any,
    pageRules: any,
    shouldRetry?: boolean
  ) {
    this.isValid = false;
    this.slugs = [];
    this.pageType = null;
    this.originalUrl = null;
    this.pageRulesObj = {};
    if (!shouldRetry) {
      this.originalUrl = originalUrl;
      this.slugValues = slugValues;
      this.pageRulesObj = pageRules;
    }
    /* Fetch slugs from DB in order */
    if (!_.isEmpty(this?.slugValues)) {
      const SLUGS = await this.slugRepo.getSlugsBySlugs(this.slugValues);
      const Validated = await this.validateSlugs(SLUGS);
      this.validated = Validated;
    } else {
      const Validated = await this.validateSlugs();
      this.validated = Validated;
    }

    if (!this?.isValid) {
      throw this.notFound;
    }

    if (this.validated) {
      return {
        pageType: this.pageType,
        category: this.category,
        city_state_country: this.city_state_country,
        area: this.area,
      };
    } else {
      throw this.notFound;
    }
  }

  protected async validateSlugs(slugs?: any) {
    
    // if (!_.isEmpty(slugs)) {
    const sluggableTypes = _.map(slugs, "sluggable_type");

    for (const pageType in this.pageRulesObj) {
      const rules = this.pageRulesObj[pageType];

      if (rules.sluggable_types.length === sluggableTypes.length) {
        /**
         * When no slugs are supposed to be checked, i.e. the url doesn't have slugs.
         * Ex - Hospitals in India page, has url = '/hospitals' which has not slug to be matched.
         */

        if (rules.sluggable_types.length === 0 && sluggableTypes.length === 0) {
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
      if (this?.isValid) {
        this.pageType = pageType;
        break;
      }
      if (!this?.isValid && this.pageRulesObj.length === 0) {
        return;
      }
    }
    if (this?.isValid) {
      const Validated = await this.validateCallback(slugs);
      return Validated;
    } else {
      return;
    }
    // }
  }

  protected async validateCallback(slugs: any) {
    if (this?.isValid) {
      const Closure = this.pageRulesObj[this.pageType]?.callback_validation;
      /**
       * sometimes we don't provide 'callback_validation' function
       * in 'pageRulesObj'
       */
      const Result =
        Closure instanceof Function
          ? await Closure(this.originalUrl, slugs)
          : true;
      this.isValid = Result?.isValid;

      if (!this?.isValid) {
        delete this.pageRulesObj[this.pageType];
        this.validateSlugs(slugs);
      } else {
        this.category = Result?.category;
        this.city_state_country = Result?.city_state_country?.sluggable_id;
        this.area = Result?.area;
        return true;
      }
    }
  }

  public fails() {
    return !this.isValid;
  }
}

export default ValidatePageTypeAndSlugs;
