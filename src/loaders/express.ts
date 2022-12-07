// import "express-async-errors";
import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { registerContainer } from "./container";
/**
 * call this function before importing the router
 */
registerContainer();
import routes from "../routes";
import cls from "../plugins/cls";
// import errorHandler from "../middlewares/errorHandler";
// import { HttpException } from "../exceptions";
// import cls from "../plugins/cls";
// import logRequest from "../middlewares/logRequest";

export default ({ app }: { app: Application }) => {
  /*
   * Enable Cross Origin Resource Sharing to all origins by default
   */
  app.use(cors({ credentials: false }));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Helps set request scoped properties or methods.
  // Every request has it's own scoped preventing cross request population of values.
  app.use(cls.middleware);

  // Add the middleware, passing it your Awilix container.
  // This will attach a scoped container on the context.

  // Load all the routes
  app.use(routes);

  // Catches 404 and forward to error handler
  // app.use((_req, _res, next) => {
  //   const err = new HttpException(404, "Not found.");
  //   next(err);
  // });

  /*
   * Triggered by the package "express-async-errors"
   * whenever, ANY exception occurs while handling the request.
   */

  // app.use(errorHandler);
};
