const router=require("express").Router();
const nodemailer=require("nodemailer")
const Student=require("../Modals/Student")
const Admin=require("../Modals/Admin")
const Bonofide=require("../Modals/Bonofide");
const { application } = require("express");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kadaruminni24@gmail.com', // Your Gmail email address
      pass: 'zsnriadworrmfeiu'   // Your Gmail password or an "App Password" if using 2-factor authentication
    }
  });

//new application
router.post("/applyBonofide",async(req,res)=>{

    try{
        const {appliedStudentID,reasonForBonofide}=req.body;

        const newApplication=new Bonofide({
            appliedStudentID,
            reasonForBonofide,
            
        });

        const appliedStudent=await Student.findById(appliedStudentID)
        if (!appliedStudent) {
            return res.status(404).json({ message: "Student not found" });
          }
        const application=await newApplication.save();

        const populatedApplication = await Bonofide.findById(application._id)
    .   populate('appliedStudentID', 'email studentName')
  .     exec()


        res.status(200).json(populatedApplication);

        console.log(populatedApplication.appliedStudentID.studentName)

        // Sending an email
        const mailOptions = {
            from: populatedApplication.appliedStudentID.email,
            to: 'kadaruminni24@gmail.com', 
            subject: 'New Bonofide Application',
            text: `A new Bonofide application has been submitted by ${populatedApplication.appliedStudentID.studentName}. Reason: ${populatedApplication.reasonForBonofide}`
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to send email" });
            } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(populatedApplication);
            }
        });
        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

//get all unverified bonofides

router.get("/unverified",async(req,res)=>{
    try{
        let unverifiedBonofides=await Bonofide.find({statusOfBonofide : 'Unverified'})
        res.status(200).json(unverifiedBonofides)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//Bonofide.findById({appliedStudentID:req.params.id}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
router.get('/:id',async(req,res)=>{
    try{
      //console.log(typeof(req.params.id))
      const bonofides=await Bonofide.find({appliedStudentID:req.params.id})
      return res.status(200).json(bonofides);
    }
    catch(e){
      console.log(e)
    }
  
  })

//get all verified bonofides

router.get("/verified",async(req,res)=>{
    try{
        let verifiedBonofides=await Bonofide.find({statusOfBonofide : 'Verified'})
        res.status(200).json(verifiedBonofides)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
})



 module.exports=router


// const router=require('express').Router();
// const Bonofide=require('../Modals/Bonofide.js');

// router.post("/reqbonofide",async(req,res)=>{
//     try{
//         const newreq=new Bonofide({
//             appliedStudentID :req.body.appliedStudentID,
//             reasonForBonofide :req.body.reasonForBonofide ,
//             statusOfBonofide :req.body.statusOfBonofide 
//         })
//         await newreq.save();
//         //send email here
//         res.status(400).json("Request recived successfully")
//     }
//     catch(err){
//         console.log(err)
//         res.status(400).json(err);
//     }
// })
// //here id is student rollnumber
// router.get("./borofidereq/:id",async (req,res)=>{
//     Bonofide.findById({appliedStudentID:req.params.id}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
//     })
// router.delete("./borofidereq/:id",async (req,res)=>{
//     Complaint.findByIdAndDelete({appliedStudentID:req.params.id}).then(()=>res.send("deleted")).catch(err=>res.json(err))
// })
// router.put("./grantborofide/:id",async (req,res)=>{
//     statusOfBonofide=req.body.status;
//     try{
//         await Complaint.findByIdAndUpdate({appliedStudentID:req.params.id},{statusOfBonofide:statusOfBonofide}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
//         if(statusOfBonofide){
//             //send the auto generated email of Bonofide
//         }
//         res.status(200).send("updated")
//     }
//     catch(err){
//         res.status(400).json(err)
//     }
// })
// module.exports=router