const mongoose=require("mongoose");
const Student=require("./Student")
const complaintSchema=new mongoose.Schema({
    complainedStudentID : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    complainedStudentName : {
        type:String,

        required:true
    },
    
    complainedStudentRoll:{
        type:String,
        required:true
    },

    room:{
        type:Number,
        required:true
    },

    hostel:{
        type:String,
        required:true
    },


    complaint : {
        type:String,
        required:true
    },

    complaintCategory : {
        type:String,
        required:true
    },

    statusOfComplaint : {
        type: String,
        default:"Unsolved"
    }
})
module.exports=mongoose.model("Complaint",complaintSchema)