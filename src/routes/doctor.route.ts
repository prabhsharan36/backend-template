import { Router } from "express";
const router = Router();
import attachPageMiddleware from "../middlewares/attachPage.middleware";

router.get("/:slug", attachPageMiddleware, (req, res) => {
    console.log(req.params.slug);
    res.send(200)
    
});
export default router;
