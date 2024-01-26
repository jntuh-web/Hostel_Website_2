const router=require('express').Router();
const Bonofide=require('../Modals/Bonofide.js');
const Student=require('../Modals/Student.js');
const fs = require('fs');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const nodemailer = require('nodemailer');
//someone add the word docx template here and provide the path
const template = fs.readFileSync('template.docx', 'binary');
async function generate(rollno){
  student=await Student.find({rollNumber:rollno}).then(()=>{
    //get the student details
    var data = {
  name: 'John Doe',
  date: 'October 1, 2023',
  content: 'This is the content of the document.'
};
  })


// Initialize a Docxtemplater instance
const doc = new Docxtemplater();
doc.loadZip(new JSZip(template));

// Set the data for the template
doc.setData(data);

try {
  // Render the template with the data
  doc.render();

  // Generate the Word document
  const output = doc.getZip().generate({ type: 'nodebuffer' });

  // Write the generated document to a file
  fs.writeFileSync('output.docx', output);
  console.log('Word document generated successfully.');

  // Configure Nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: 'your-email-service', // e.g., 'Gmail'
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient@example.com',
    subject: 'Generated Word Document',
    text: 'Please find the attached Word document.',
    attachments: [
      {
        filename: 'generated-document.docx',
        content: output
      }
    ]
  };

  // Send the email with the Word document as an attachment
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
} catch (error) {
  console.error('Error generating Word document:', error);
}}
router.put("./grantborofide/:id",async (req,res)=>{
    statusOfBonofide=req.body.status;
    try{
        await Complaint.findAndUpdate({appliedStudentID:req.params.id},{statusOfBonofide:statusOfBonofide}).then(complaint=>{res.status(200).json(complaint);}).catch(err=>{res.status(500).json(err)})
        if(statusOfBonofide){
            //send the auto generated email of Bonofide
            generate(req.params.id);
        }
        res.status(200).send("updated")
    }
    catch(err){
        res.status(400).json(err)
    }
})
module.exports=router