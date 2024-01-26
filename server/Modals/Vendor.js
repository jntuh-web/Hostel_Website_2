const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    vendor_name: {
        type: String,
        required: true,
    },
    vendor_phNo: {
        type: Number,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pan_no: {
        type: String,
        required: true,
    },
    aadhar_no: {
        type: Number,
        required: true,
    },
    supplyType: {
        type: String,
        required: true,
    },
}, { timestamps: true })

vendorSchema.pre('save', async function (next) {
    try {
        // Find the latest transaction and get its transaction number
        const latestTransaction = await this.constructor.findOne({}, {}, { sort: { tno: -1 } });

        // Increment the transaction number for the current transaction
        this.tno = latestTransaction ? latestTransaction.tno + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Vendor", vendorSchema);