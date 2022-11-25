import BaseException from "./BaseException";
export default class BadRequestException extends BaseException {
  constructor(message: string) {
    super(message, 400, "BAD_REQUEST_ERROR");
  }
}
