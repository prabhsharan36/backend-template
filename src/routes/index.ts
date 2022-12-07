import { Router } from "express";
const router = Router();
import config from "../config";
import abortOrRedirectPageIfNeededMiddleware from "../middlewares/abortOrRedirectPageIfNeeded.middleware";
import attachPageMiddleware from "../middlewares/attachPage.middleware";
import { container } from "../loaders/container";
import api from "./api";

const docController = container.cradle.doctorController;
/**
 * API routes
 */
router.get("/api/doctor/listing/area", docController.getAreaDoctorIds);
router.get("/api/doctor/listing/pages", docController.getListingPages);

router.use(
  config.api.prefix,
  attachPageMiddleware,
  abortOrRedirectPageIfNeededMiddleware,
  api
);

export default router;
