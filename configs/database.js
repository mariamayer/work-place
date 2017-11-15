'use strict';

const mongoose = require('mongoose');

// connect to the database
mongoose.connect(`mongodb://localhost/demo`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
