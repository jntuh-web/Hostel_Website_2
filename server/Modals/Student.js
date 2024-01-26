const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true,
    },
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    typeOfCourse:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    parentPhone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    bill:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Student",studentSchema)