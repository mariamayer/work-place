'use strict';

const mongoose = require('mongoose');

// connect to the database
mongoose.connect(`mongodb://heroku_qfx65dtc:vfisa2s10bc0ht66q8gmiu9800@ds149335.mlab.com:49335/heroku_qfx65dtc`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
