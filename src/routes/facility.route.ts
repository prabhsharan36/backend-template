import { Router } from "express";
import { container } from "../loaders/container";
const router = Router();

const facilityController = container.cradle.facilityController;

router.get("/", facilityController.listing); // For India Listing
router.get("/:city_state_or_country_or_category", facilityController.listing);
router.get("/:category/:city_state_or_country?", facilityController.listing);

export default router;
