const mongoose = require("mongoose");
const Vendor=require("./Vendor")

const ItemsSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    item_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    purchase_date: {
        type: Date,
        required: true,
    },
    // ItemType: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Vendor',
    //     required: true,
    // }
}, { timestamps: true },)

ItemsSchema.pre('save', async function (next) {
    try {
        // Find the latest transaction and get its transaction number
        const latestTransaction = await this.constructor.findOne({}, {}, { sort: {id: -1 } });

        // Increment the transaction number for the current transaction
        this.id = latestTransaction ? latestTransaction.id + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("new_items", ItemsSchema)