const mongoose = require('mongoose');
const phoneSchema = new mongoose.Schema({
    localAreaCode:{
        type:String,
        required:true,
    },
    localPhoneNumber:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
  });
module.exports = mongoose.model('Phones',phoneSchema)