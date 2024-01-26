const mongoose = require("mongoose");
const NewItem=require("./NewItem");

const billsSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    
    billAmount: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
       
        required: true,
    }
}, { timestamps: true },)

billsSchema.pre('save', async function (next) {
    try {
        // Find the latest transaction and get its transaction number
        const latestTransaction = await this.constructor.findOne({}, {}, { sort: { id: -1 } });

        // Increment the transaction number for the current transaction
        this.id = latestTransaction ? latestTransaction.id + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("bills", billsSchema)