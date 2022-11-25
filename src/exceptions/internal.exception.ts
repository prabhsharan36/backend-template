import BaseException from "./BaseException";
export default class InternalException extends BaseException {
  constructor(message = "Something went wrong in server") {
    super(message, 500, "E_INTERNAL_ERROR");
  }
}
