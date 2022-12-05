import { createContainer, asClass, Resolver } from "awilix";
// import DoctorController from "../controllers/doctor.controller";
import DoctorRepository from "../repositories/doctor.repository";
import DoctorService from "../services/doctor.service";

const registrations = {
  /**
   * Repositories
   */
  doctorRepository: asClass(DoctorRepository).classic().singleton(),

  /**
   * Services
   */
  doctorService: asClass(DoctorService).classic().singleton(),

  /**
   * Controllers
   */
  // doctorController: asClass(DoctorController).classic().singleton(),
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
