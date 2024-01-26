const mongoose = require("mongoose");
const employeeListSchema=mongoose.Schema({
    adminNumber:{
        type:String,
        required:true,
        unique:true
    },
    adminName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("employeeList",employeeListSchema)