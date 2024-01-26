const router = require('express').Router();
const BillModel = require('../Modals/Bill.js');
const NewItemModel = require('../Modals/NewItem.js');

let Amount = 0;
let presentMonth = 0;

async function calcBillAmt() {
    const currDate = new Date();
    const currMonth = currDate.getMonth();

    if (currMonth !== presentMonth) {
        try {
            console.log('Calculating bill amount...');

            // Get the first day of the current month
            const firstDayOfMonth = new Date(currDate.getFullYear(), currMonth, 1);

            console.log('First day of the current month:', firstDayOfMonth);

            // Find all items purchased after the first day of the current month
            const itemsForCurrentMonth = await NewItemModel.find({
                purchase_date: { $gte: firstDayOfMonth },
            });

            console.log('Items for the current month:', itemsForCurrentMonth);

            // Calculate the total cost for the current month
            const totalCost = itemsForCurrentMonth.reduce((sum, item) => sum + item.price, 0);

            console.log('Total cost for the current month:', totalCost);

            Amount = totalCost;
            presentMonth = currMonth;

            console.log('Updated Amount:', Amount);
        } catch (error) {
            console.error('Error calculating bill amount:', error);
        }
    }
}


router.post('/sendBill', async (req, res) => {
    try {
        await calcBillAmt(); // Calculate the bill amount before saving the bill

        console.log('Sending bill with Amount:', Amount);

        const newBill = new BillModel({
            billAmount: Amount,
            month: presentMonth,
        });

        const savedBill = await newBill.save();
        return res.status(200).json(savedBill);
    } catch (err) {
        console.error('Error sending bill:', err);
        res.status(400).json('Error');
    }
});

module.exports = [router, calcBillAmt];
