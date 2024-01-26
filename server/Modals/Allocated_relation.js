const mongoose = require("mongoose");
import Room from "./Rooms";

const allocatedSchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    student_roll_no: {
        type: String,
        required: true,
        unique: true,
    }

}, { timestamps: true })

module.exports = mongoose.module("Allocated", allocatedSchema);