import { Router } from "express";
const router = Router({ mergeParams: true });
import doctor from "./doctor.route";
import facility from "./facility.route";

router.use("/doctor", doctor);
router.use("/hospitals", facility);

export default router;
