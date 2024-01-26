const mongoose = require("mongoose");
const allocatedListSchema=mongoose.Schema({
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    studentName:{
        type:String,
        required:true
    },
    hostel:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("allocatedList",allocatedListSchema)