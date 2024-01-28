const mongoose = require("mongoose");
const Student = require("./Student")
const complaintSchema = new mongoose.Schema({
    complainedStudentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    complaint: {
        type: String,
        required: true
    },

    complaintCategory: {
        type: String,
        required: true
    },

    statusOfComplaint: {
        type: String,
        default: "Unsolved"
    },
    DateOfRequest: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model("Complaint", complaintSchema)