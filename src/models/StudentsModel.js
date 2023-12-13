const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    Name:{type:String,required:true},
    Roll:{type:Number,
        unique:true,
        min:[6,'Minimum Value is 6, But Got {VALUE}'],
        max:[20, 'Maximum Value is 12, But got {VALUE}']},
    Mobile:{
        type:String,
        validate:{
             validator: function(value){

               return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value)

             },
             message: "Invalid Mobile number"
        
        }

    },
    class:{type:String},
    Remarks:{type:String,default:"No remarks"}
},{ versionKey: false });

const StudentModel = mongoose.model('students',DataSchema);

module.exports = StudentModel;