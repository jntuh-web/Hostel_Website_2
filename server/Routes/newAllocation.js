const express = require("express");
const { createNewAllocation, getAllallocated, deleteAllocation, updateAllocation } = require("./contollers")

const router = express.Router();

router.get("/getAllalloc", getAllallocated);
router.post("/createNewAlloc", createNewAllocation);
router.put("/updateAlloc/:id", updateAllocation);
router.delete("/deleteAlloc/:id", deleteAllocation);

module.exports = router;