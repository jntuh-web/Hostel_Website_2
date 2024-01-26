const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    adminName:{
        type:String,
        required:true,
    },
    adminID:{
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
        required:true
    },
    hostelName:{
        type:String,
        required:true
    },

    designation:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Admin",adminSchema)