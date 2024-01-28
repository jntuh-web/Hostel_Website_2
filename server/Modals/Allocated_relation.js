const mongoose = require("mongoose");
const Room = require("./Rooms")

const allocatedSchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.String,
        ref: 'Room',
        required: true,
    },
    student_roll_no: {
        type: String,
        required: true,
        unique: true,
    }

}, { timestamps: true })

module.exports = mongoose.model("Allocated", allocatedSchema);