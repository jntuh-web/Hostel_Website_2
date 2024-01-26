const mongoose = require("mongoose");
const Hostle =require("./Hostle");

const roomSchema = mongoose.Schema({
    room_id: {
        type: Number,
        required: true,
        unique: true,
    },
    block_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostle',
        required: true,
    },
    max_capacity: {
        type: Number,
        required: true,
    },
    allocated_number: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Room", roomSchema);