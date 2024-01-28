const mongoose = require('mongoose')
const Student = require("./Student")
const Admin = require("./Admin")

const bonofideSchema = new mongoose.Schema({
    appliedStudentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    reasonForBonofide: {
        type: String,
        required: true
    },

    statusOfBonofide: {
        type: String,
        default: "Unverified"
    },
    DateOfRequest: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model("Bonofide", bonofideSchema)
