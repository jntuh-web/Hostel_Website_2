const router = require('express').Router();
const AllocatedList = require('../Modals/AllocatedList.js');

router.post("/allocateNewStudent",async(req,res)=>{
    try{
        const newAllocatedStudent = new AllocatedList({
            rollNumber: req.body.rollNumber,
            studentName: req.body.studentName,
            hostel:req.body.hostel
          });
            const allocatedstudent=await newAllocatedStudent.save()
            return res.status(200).json(allocatedstudent)
    }
    catch(err){
        console.log(err)
        res.status(400).json("Error")
    }
})

module.exports=router