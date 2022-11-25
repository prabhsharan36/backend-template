import BaseException from "./BaseException";
export default class BadRequestException extends BaseException {
  constructor(message = "Page not found") {
    super(message, 404);
  }
}
