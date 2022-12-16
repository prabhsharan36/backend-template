import { createContainer, asClass, asFunction, Resolver } from "awilix";
import { NotFound } from "../exceptions";
import { internalError } from "../utils/responses.util";
// import { getImageUrl } from "../services/image.service";

const registrations = {
  /**
   * Repositories
   */

  /**
   * Services
   */

  /**
   * Controllers
   */

  /**
   * Exceptions
   */
  notFound: asClass(NotFound).classic().singleton(),

  /**
   * Functions
   */
  // getImageUrl: asFunction(getImageUrl).classic().singleton(),
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
