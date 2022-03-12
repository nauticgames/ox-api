import { Router } from "express";
import * as stadiumsController from "../controllers/stadiums.controller";
import AuthenticatedRequest from "../middlewares/AuthenticatedRequest";

const router = Router();

router.get("/metadata/:id", stadiumsController.getMetadata);
router.post(
  "/metadata/resync",
  AuthenticatedRequest,
  stadiumsController.reSyncMetadata
);

export default router;
