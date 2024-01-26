const express = require("express");
const { createNewVendor } = require("./contollers");

const router = express.Router();

router.post("/createNewVendor", createNewVendor)

module.exports = router;