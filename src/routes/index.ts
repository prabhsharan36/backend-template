import { Router } from "express";
const router = Router();

import config from "../config";
import abortOrRedirectPageIfNeededMiddleware from "../middlewares/abortOrRedirectPageIfNeeded.middleware";
import attachPageMiddleware from "../middlewares/attachPage.middleware";
import api from "./api";

/**
 * API routes
 */
router.use(config.api.prefix, attachPageMiddleware, abortOrRedirectPageIfNeededMiddleware, api);

export default router;
