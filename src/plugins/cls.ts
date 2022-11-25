/*
 * This implementation is inspired by the package "express-http-context".
 * The reason to not use the package directly is that, it would make
 * the "Continous Local Storage" (CLS) implementation tightly coupled with
 * HTTP request. This implementation allows the usage even if the module using it
 * is not called from a HTTP request.
 */
// we can't have global state on something which is processing many things in parallel for different users, cls comes to the rescue here.
import cls from "cls-hooked";

// Namespaces (ns) are a way to scope global data so we don’t end up getting values from somebody else.

const nsid = "a6a29a6f-6747-4b5f-b99f-07ee96e32f88";
const ns = cls.createNamespace(nsid);

// Express.js middleware that is responsible for initializing the context for each request.
function middleware(req: any, res: any, next: () => any) {
  ns.run(() => next());
}

/*
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 * @param {string} key
 */
function get(key: any) {
  if (ns && ns.active) {
    return ns.get(key);
  }
}

/*
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.  No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
function set(key: any, value: any) {
  if (ns && ns.active) {
    return ns.set(key, value);
  }
}

export default { middleware, get, set, ns };
