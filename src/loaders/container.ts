import { createContainer, asClass, asFunction, Resolver } from "awilix";
import ValidatePageTypeAndSlugs from "../middlewares/validatePageTypeAndSlugs.middleware";
import DoctorController from "../controllers/doctor.controller";
import DoctorRepository from "../repositories/doctor.repository";
import SlugRepository from "../repositories/slug.repository";
import DoctorService from "../services/doctor.service";
import { NotFound } from "../exceptions";
import { internalError } from "../utils/responses.util";
import FacilityController from "../controllers/facility.controller";

const registrations = {
  /**
   * Repositories
   */
  doctorRepository: asClass(DoctorRepository).classic().singleton(),
  slugRepository: asClass(SlugRepository).classic().singleton(),

  /**
   * Services
   */
  doctorService: asClass(DoctorService).classic().singleton(),

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
