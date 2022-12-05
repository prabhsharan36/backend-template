import { Router } from "express";
const router = Router();
import DoctorController from "../controllers/doctor.controller";

import config from "../config";
import abortOrRedirectPageIfNeededMiddleware from "../middlewares/abortOrRedirectPageIfNeeded.middleware";
import attachPageMiddleware from "../middlewares/attachPage.middleware";
import api from "./api";
// import { container } from "../loaders/container";

// router.get('/test', async (req, res) => {
//     container.cradle.doctorService.test();
//     return res.send("done")
// })
/**
 * API routes
 */

router.get("/api/doctor/listing/pages", DoctorController.getListingPages);

router.get("/api/doctor/listing/area", DoctorController.getAreaDoctorIds);
// router.get(
//   "/api/doctor/listing-pages",
//   container.resolve('doctorController').getListingPages
// );
//  router.get("/api/doctors/area", container.cradle.doctorController.listing);

router.use(
  config.api.prefix,
  attachPageMiddleware,
  abortOrRedirectPageIfNeededMiddleware,
  api
);

export default router;
