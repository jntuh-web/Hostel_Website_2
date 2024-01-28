const router=require('express').Router();
const Complaint=require('../Modals/Complaint.js');

router.post("/complaintregister",async(req,res)=>{
    try{
        const newComplaint= new Complaint({
            complainedStudentID:req.body.complainedStudentID,
            complainedStudentName:req.body.username,
            complainedStudentRoll:req.body.rollno,
            room:req.body.roomno,
            hostel:req.body.hostelName,
            complaint:req.body.description,
            complaintCategory:req.body.category
        })
        await newComplaint.save();
        //send email here
        res.status(200).json("complaint recived successfully")
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})
router.get("/:id",async (req,res)=>{
   Complaint.find({complainedStudentID:req.params.id}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
    })
router.delete("/complaint/:id",async (req,res)=>{
    Complaint.findByIdAndDelete(req.params.id).then(()=>res.send("deleted")).catch(err=>res.json(err))
})
router.put("./complaint/:id",async (req,res)=>{
    statusOfComplaint=req.status;
    try{
        await Complaint.findByIdAndUpdate(req.params.id,{statusOfComplaint:statusOfComplaint}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
        if(statusOfComplaint){
            //send solved email here
        }
        res.status(200).send("updated")
    }
    catch(err){
        res.status(400).json(err)
    }
})
module.exports=router