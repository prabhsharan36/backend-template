import _ from "lodash";
import { container } from "../loaders/container";

class ValidatePageTypeAndSlugs {
  protected isValid = false;
  protected pageRulesObj: any;
  protected slugValues: any;
  public slugs: any;
  public pageType: any;

  protected slugRepo = container.cradle.slugRepository;
  protected notFound = container.cradle.notFound;

  public async execute(slugValues: any, pageRules: any, shouldRetry?: boolean) {
    if (!shouldRetry) {
      this.slugValues = slugValues;
      this.pageRulesObj = pageRules;
    }

    /* Fetch slugs from DB in order */
    const SLUGS = await this.slugRepo.getSlugsBySlugs(this.slugValues);
    this.validateSlugs(SLUGS);
    this.validateCallback(SLUGS);
    if (typeof this.pageType !== "string") {
      throw this.notFound;
    }
    return this.pageType;
  }

  protected validateSlugs(slugs: any) {
    if (slugs.length > 0) {
      const sluggableTypes = _.map(slugs, "sluggable_type");

      for (const pageType in this.pageRulesObj) {
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
        this.execute(null, null, true);
      }
    }
  }

  public fails() {
    return !this.isValid;
  }
}

export default ValidatePageTypeAndSlugs;
