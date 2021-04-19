const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required: true,
    },
    phoneNumbers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phone',
    },
   ],
});
module.exports = mongoose.model('Students',studentSchema);