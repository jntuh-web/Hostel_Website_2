const express = require("express");
const { createNewRoom, getAllRooms, deleteRoom, updateRoom } = require("./contollers")

const router = express.Router();

router.get("/getAllRooms", getAllRooms);
router.post("/createNewRoom", createNewRoom);
router.put("/updateRoom/:id", updateRoom);
router.delete("deleteRoom/:id", deleteRoom);

module.exports = router;