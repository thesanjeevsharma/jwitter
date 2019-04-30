const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// ENVIRONMENT VARIABLES
require('dotenv').config();

// LOCAL IMPORTS


// DB CONNECTION
mongoose.connect(require('./config/db.config').MongoURI, { useCreateIndex : true, useNewUrlParser : true })
        .then(() => console.log(`*DB Connected...`))
        .catch(err => console.log(err));

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/users', require('./routes/user.router'));
app.use('/jweets', require('./routes/jweet.router'));

// SERVER SETTINGS
app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`*Server started on http://${process.env.HOST}:${process.env.PORT}`);
})
