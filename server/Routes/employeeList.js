const router = require('express').Router();
const Employee = require('../Modals/EmployeeList.js');

router.post("/createEmployee",async(req,res)=>{
    try{
        const newEmployee = new Employee({
            adminNumber: req.body.adminNumber,
            adminName: req.body.adminName,
          });
          const employee=await newEmployee.save()
          return res.status(200).json(employee)
    }
    catch(err){
        console.log(err)
        res.status(400).json("Error")
    }
})

module.exports=router