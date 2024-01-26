const express = require("express")
const { createNewHostle, getAllHostles } = require("./contollers")

const router = express.Router()

router.get("/getAllHostles", getAllHostles);
router.post("/createNewHostle", createNewHostle);

module.exports = router;