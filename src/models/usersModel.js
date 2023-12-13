const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({

    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,

        validator: function(value){

            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value)

          },
          message: "Invalid Mobile number"
    
    },
    password:{type:String,required:true},
    photo:{type:String},
    created_at:{type:Date,default: Date.now()}

},{versionKey:false})
const usersModel = mongoose.model('users',DataSchema)
module.exports = usersModel