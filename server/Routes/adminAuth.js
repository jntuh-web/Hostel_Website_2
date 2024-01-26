const router = require('express').Router();
const Admin = require('../Modals/Admin.js');
const bcrypt = require("bcrypt");
const Employees=require("../Modals/EmployeeList.js")

//gmail validation
function isGmailValid(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return gmailRegex.test(email);
}

router.post("/register", async (req, res) => {
    try {
        const Password = req.body.password;
        const ConfirmPassword = req.body.confirmPassword;
        const adminNo = req.body.adminID;
        const validAdmin = await Employees.findOne({ adminNumber: adminNo });

        if (!validAdmin) {
        return res.status(400).json('You are not an employee');
        }
        if (Password !== ConfirmPassword) {
            return res.status(400).json("Passwords not matching");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(req.body.password, salt);
            const newAdmin = new Admin({
                adminName: req.body.adminName,
                adminID: req.body.adminID,
                email: req.body.email,
                phone: req.body.phone,
                hostelName: req.body.hostelName,
                designation: req.body.designation,
                password: hashpassword,
                confirmPassword: hashpassword
            });

            // Check if the email is a valid Gmail address before creating a new admin.
            if (!isGmailValid(req.body.email)) {
                return res.status(400).json("Invalid email");
            }

            const admin = await newAdmin.save();
            return res.status(200).json(admin);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const adminNo = req.body.adminID;
        const validAdmin = await Admin.findOne({ adminID: adminNo });
        const validPassword = await bcrypt.compare(req.body.password, validAdmin.password);

        if (!validAdmin || !validPassword) {
            return res.status(400).json("Invalid credentials");
        } else {
            return res.status(200).json(validAdmin);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json("error");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updateAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        return res.status(200).json(updateAdmin);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
