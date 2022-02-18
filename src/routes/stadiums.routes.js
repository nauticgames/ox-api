const { Router } = require("express");
const {
  getMetadata,
  reSyncMetadata,
} = require("../controllers/stadiums.controller");
const { AuthenticatedReq } = require("../middlewares/AuthenticatedRequest");

const router = Router();

router.get("/metadata/:id", getMetadata);
router.post("/metadata/resync", AuthenticatedReq, reSyncMetadata);

module.exports = router;
