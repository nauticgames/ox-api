const { Router } = require("express");
const {
  uploadMetadata,
  getMetadata,
} = require("../controllers/stadiums.controller");

const router = Router();

router.post("/metadata", uploadMetadata);
router.get("/metadata/:id", getMetadata);

module.exports = router;
