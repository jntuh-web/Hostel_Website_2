const express = require("express");
const { createNewRoom, getAllRooms, deleteRoom } = require("./contollers")

const router = express.Router();

router.get("/getAllRooms", getAllRooms);
router.post("/createNewRoom", createNewRoom);
router.delete("/:id", deleteRoom);

module.exports = router;