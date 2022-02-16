const { Router } = require("express");
const { getMetadata } = require("../controllers/stadiums.controller");

const router = Router();

router.get("/metadata/:id", getMetadata);

module.exports = router;
