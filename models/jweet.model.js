const mongoose = require('mongoose');

const JweetSchema = new mongoose.Schema({
    body : {
        type : String,
        required : [true, 'Jweet body cannot be empty.']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Teen'
    }   
}, {
    timestamps : true
});

module.exports = mongoose.model('Jweet', JweetSchema);