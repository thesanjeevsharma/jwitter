const Jweet = require('../models/jweet.model');
const User = require('../models/user.model');

// Post a new jweet
module.exports.postJweet = (req, res) => {
    console.log(req.decoded);
    req.body.author = req.decoded.id;
    const resJweet = req.body;
    const jweet = new Jweet(req.body);
    jweet.save()
        .then((doc) => {
            return User.findOneAndUpdate({ _id : req.decoded.id }, { $push : { jweets : doc._id }});
        })
        .then((doc) => {
            res.json({ success : true, message : 'Jweet created.',  data : { jweet : resJweet }});
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data :null });
        });
}

// Get all jweets
module.exports.fetchJweets = (req, res) => {
    Jweet.find({}).populate('author', '-_id username').sort({ 'createdAt' : -1 })
        .then((docs) => {
            console.log(docs);
            res.json({ success : true, message : 'Jweets fetched.',  data : docs});
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data :null });
        });
}

// Get my mentions
module.exports.myMentions = (req, res) => {
    User.findOne({ _id : req.decoded.id })
        .then((doc) => {
            return Jweet.find({ 'body' : { $regex : '@' + doc.username, $options : 'i m' } }).populate('author', '-_id username');
        })
        .then((docs) => {
            res.json({ success : true, message : 'Jweets fetched.', data : docs });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}

// Get my jweets
module.exports.myJweets = (req, res) => {
    Jweet.find({ author : req.decoded.id }).populate('author', '-_id username')
        .then((docs) => {
            res.json({ success : true, message : 'Jweets fetched', data : docs });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}