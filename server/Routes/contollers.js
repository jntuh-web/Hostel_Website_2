const express = require("express");
const { Items } = require("../data/Items.json");
const { Itemmodal, Vendormodal, Roommodal, Hostlemodal, Allocmodal } = require("../Modals/server")

/**
 * Route: /fixed
 * Method: GET
 * Description: Getting list of all items
 * Access: Public
 * Parameters:none
 */

exports.getAllItems = async (req, res) => {
    const item = await Itemmodal.find();

    if (item.length === 0) {
        res.status(404).json({
            sucess: false,
            message: "No data found"
        })
    }
    else {
        res.status(200).json({
            sucess: true,
            data: item
        })
    }

}
/**
 * Route: /fixed
 * Method: POST
 * Description: Creating item
 * Access: Public
 * Parameters:none
 */
exports.createNewItem = async (req, res) => {
    try {
        const { data } = req.body;
        const newItem = await Itemmodal.create(data)

        res.status(200).json({
            sucess: true,
            message: "Data added successfully"
        })
    }
    catch (err) {
        console.log(err);
    }
}


exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const Item = await Itemmodal.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true })
    try {
        if (!Item) {
            res.status(404).json({
                sucess: false,
                message: "Item not found"
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                message: "Item updated sucessfully",
                data: Item
            })
        }
    }
    catch (err) {
        console.log(err);
    }

}

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    const Item = await Itemmodal.deleteOne({ _id: id });
    try {
        if (!Item) {
            res.status(404).json({
                sucess: false,
                message: "Item not found",
            })
        }

        res.status(200).json({
            sucess: true,
            message: "Item deleted sucessfully"
        })
    }
    catch (err) {
        console.log(err);
    }
}

exports.createNewVendor = async (req, res) => {

    try {
        const { data } = req.body;
        const Vendor = await Vendormodal.create(data);
        res.status(200).json({
            sucess: true,
            data: Vendor,
            message: "Data added sucessfully"
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.createNewRoom = async (req, res) => {
    try {
        const { data } = req.body;
        const Room = await Roommodal.create(data);
        res.status(200).json({
            sucess: true,
            message: "Data added sucessfully"
        })
    }
    catch (err) {
        console.log(err);
    }
}

exports.getAllRooms = async (req, res) => {
    const Room = await Roommodal.find();


    if (Room.length === 0) {
        res.status(404).json({
            sucess: false,
            message: "No data found"
        })
    }
    else {
        res.status(200).json({
            sucess: true,
            message: Room
        })
    }
}

exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const Room = await Roommodal.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true })
    try {
        if (!Room) {
            res.status(404).json({
                sucess: false,
                message: "Not found"
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                message: "Updated sucessfully",
                data: Room
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.deleteRoom = async (req, res) => {
    const { id } = req.params;
    const Room = await Roommodal.deleteOne({ _id: id });
    try {
        if (!Room) {
            res.status(404).json({
                sucess: false,
                message: "ID not found"
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                message: "Deleted sucessfully"
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.createNewHostle = async (req, res) => {
    try {
        const { data } = req.body;
        const Hostle = await Hostlemodal.create(data);
        res.status(200).json({
            sucess: true,
            message: "Data added sucessfully"
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAllHostles = async (req, res) => {
    const Hostle = await Hostlemodal.find();


    if (Hostle.length === 0) {
        res.status(404).json({
            sucess: false,
            message: "No data found"
        })
    }
    else {
        res.status(200).json({
            sucess: true,
            message: Hostle
        })
    }
}

exports.getAllallocated = async (req, res) => {
    const alloc = await Allocmodal.find();

    if (alloc.length === 0) {
        res.status(404).json({
            sucess: false,
            message: "No data found"
        })
    }
    else {
        res.status(200).json({
            sucess: true,
            data: alloc
        })
    }

}

exports.createNewAllocation = async (req, res) => {
    try {
        const { data } = req.body;
        const newAlloc = await Allocmodal.create(data)

        res.status(200).json({
            sucess: true,
            message: "Data added successfully"
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.updateAllocation = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const Alloc = await Allocmodal.findOneAndUpdate({ _id: id }, { $set: { ...data } }, { new: true })
    try {
        if (!Alloc) {
            res.status(404).json({
                sucess: false,
                message: "Not found"
            })
        }
        else {
            res.status(200).json({
                sucess: true,
                message: "Updated sucessfully",
                data: Alloc
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.deleteAllocation = async (req, res) => {
    const { id } = req.params;

    const Alloc = await Allocmodal.deleteOne({ _id: id });
    try {
        if (!Alloc) {
            res.status(404).json({
                sucess: false,
                message: "Not found",
            })
        }

        res.status(200).json({
            sucess: true,
            message: "Deleted sucessfully"
        })
    }
    catch (err) {
        console.log(err)
    }
}