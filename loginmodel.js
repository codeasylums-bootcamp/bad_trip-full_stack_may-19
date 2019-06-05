const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required:true},
    last_name: {type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true,unique:false},
    curLevel:{type:Number, default: 1},
});
module.exports = mongoose.model('login',loginSchema);