const mongoose = require('mongoose');
const customersSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required: true,
    },
    phone:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    }
},{
    timestamps: true
});
module.exports = mongoose.model('Customers',customersSchema)