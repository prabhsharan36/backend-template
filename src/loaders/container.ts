import { createContainer, asClass, asFunction, Resolver } from "awilix";
import ValidatePageTypeAndSlugs from "../middlewares/validatePageTypeAndSlugs.middleware";
import DoctorController from "../controllers/doctor.controller";
import DoctorRepository from "../repositories/doctor.repository";
import SlugRepository from "../repositories/slug.repository";
import DoctorService from "../services/doctor.service";
import { NotFound } from "../exceptions";
import { internalError } from "../utils/responses.util";
import FacilityController from "../controllers/facility.controller";
import CategoryRepository from "../repositories/category.repository";
import FacilityRepository from "../repositories/facility.repository";
import FacilityService from "../services/facility.service";
import AreaRepository from "../repositories/area.respository";
import { getFacilityListingData } from "../viewModels/facilityListing";

const registrations = {
  /**
   * Repositories
   */
  doctorRepo: asClass(DoctorRepository).classic().singleton(),
  slugRepo: asClass(SlugRepository).classic().singleton(),
  categoryRepo: asClass(CategoryRepository).classic().singleton(),
  facitlityRepo: asClass(FacilityRepository).classic().singleton(),
  areaRepo: asClass(AreaRepository).classic().singleton(),

  /**
   * Services
   */
  doctorService: asClass(DoctorService).classic().singleton(),
  facilityService: asClass(FacilityService).classic().singleton(),

  /**
   * Controllers
   */
  doctorController: asClass(DoctorController).classic().singleton(),
  facilityController: asClass(FacilityController).classic().singleton(),

  /**
   * Helpers
   */
  validatePageTypeAndSlugs: asClass(ValidatePageTypeAndSlugs)
    .classic()
    .singleton(),

  /**
   * Exceptions
   */
  notFound: asClass(NotFound).classic().singleton(),

  /**
   * Functions
   */
  internalError: asFunction(internalError).classic().singleton(),
  getFacilityListingData: asFunction(getFacilityListingData)
    .classic()
    .singleton(),
};

/**
 * Extracts the type that will be resolved from a resolver.
 */
type ExtractResolverType<T> = T extends Resolver<infer X> ? X : null;
type Registration<K = typeof registrations> = {
  [T in keyof K]: ExtractResolverType<K[T]>;
};

export const container = createContainer<Registration>({
  // injectionMode: InjectionMode.CLASSIC,
});

export function registerContainer() {
  container.register(registrations);
}
