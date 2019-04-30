const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, ['Username is required!']]
    },
    password : {
        type : String,
        required : [true, ['Password is required!']]
    },
    jweets : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Jweet'
    }]
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = mongoose.model('Teen', UserSchema);