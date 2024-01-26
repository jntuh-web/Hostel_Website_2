const express = require("express");
const [, calcBillAmt ] = require('../Routes/billRoute'); // Import calcBillAmt specifically
const { Items } = require("../data/Items.json");
const server = require("../Modals/server");
const { Itemmodal } = server;

const router = express.Router();

// ... (other routes)

/**
 * Route: /fixed
 * Method: POST
 * Description: Creating item
 * Access: Public
 * Parameters: none
 */
router.post("/createnewItem", async (req, res) => {
    try {
        const { data } = req.body;
        const newItem = await Itemmodal.create(data);

        // Assuming you have the required parameters for calcBillAmt, pass them accordingly
        // For example, you might want to pass the amount and month as arguments
        const date=new Date(data.purchase_date);
        const month=date.getMonth();
        

        res.status(200).json({
            success: true,
            data: newItem,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

/**
 * Route: /fixed
 * Method: GET
 * Description: Getting list of all items
 * Access: Public
 * Parameters: none
 */
router.get("/getAllItems", async (req, res) => {
    try {
        const items = await Itemmodal.find();
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post("/updateItem/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        const item = await Itemmodal.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!item) {
            res.status(404).json({
                success: false,
                message: "Item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

router.post("/deleteItem/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Itemmodal.deleteOne({ _id: id });
        if (!item.deletedCount) {
            res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
