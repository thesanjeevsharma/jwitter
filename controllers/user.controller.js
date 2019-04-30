const User = require('../models/user.model');
const Jweet = require('../models/jweet.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
module.exports.register = (req, res) => {
    User.findOne({ username : req.body.username })
        .then((doc) => {
            if(doc) {
                throw new Error('User with that username already exists.');   
            }
            else {
                const newUser = new User(req.body);
                return newUser.save();
            }
        })
        .then((doc) => {
            res.json({ success : true, message : 'Registered as user.', data : null });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}

// Login User
module.exports.login = (req, res) => {
    User.findOne({ username : req.body.username })
        .then((doc) => {
            if(!doc) {
                throw new Error('No such user exists.');
            }
            else {
                if(bcrypt.compareSync(req.body.password, doc.password)) {
                    let token = jwt.sign({ id : doc._id }, `${process.env.SECRET}`, { expiresIn : '24h' });
                    res.json({ success : true,  message : 'User authenticated.', data : {token} });
                }
                else {
                    throw new Error('Password incorrect.');
                }
            }
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}

// Mention User
module.exports.mention = (req, res) => {
    if(req.params.mention) {
        User.find({ 'username' : { $regex : req.params.mention, $options : 'i' } }, '-_id username')
            .then((docs) => {
                res.json({ success : true, message : 'Mentions fetched.', data : docs });
            })
            .catch((err) => {
                res.json({ success : false, message : err.message, data : null });                
            });
    }
    else {
        User.find({}, '-_id username')
            .then((docs) => {
                res.json({ success : true, message : 'Mentions fetched.', data : docs });
            })
            .catch((err) => {
                res.json({ success : false, message : err.message, data : null });                
            });
    }
}

module.exports.checkUsername = (req, res) => {
    if(req.params.username) {
        User.findOne({ username : req.params.username })
            .then((doc) => {
                if(doc) throw new Error('Already taken!');
                else res.json({ success : true, message : 'You can take that username.', data : null });
            })
            .catch((err) => {
                res.json({ success : false, message : err.message, data : null });
            })
    }
}

