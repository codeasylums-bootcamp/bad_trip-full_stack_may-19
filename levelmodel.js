const mongoose = require('mongoose');
const levelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level :{type:String},
    password: {type:String},
});
module.exports = mongoose.model('level',levelSchema);