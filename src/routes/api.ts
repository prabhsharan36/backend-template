import { Router } from "express";
const router = Router({ mergeParams: true });
import doctor from "./doctor.route";
// import cost from "./cost.route";

router.use("/doctor", doctor);
// router.use("/cost", cost);

export default router;
