import { Router } from "express";
const router = Router({ mergeParams: true });
import doctor from "./doctor.route";


router.use("/doctor",  doctor);

export default router;
