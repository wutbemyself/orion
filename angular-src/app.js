// import { connect } from 'mongoose';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./app/config/database');
var logger = require('logger').createLogger();


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"",
//   database:"testing"
// })
// con.connect(function(err){
//   if(err) throw err;
//   logger.info('Connected to database Successfuly.');
  
// })

mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  // console.log('Connected to database ' + config.database);
  logger.info('Connected to database Successfuly.');
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});



const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/dist')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  logger.info('Server started on port ' + port);
});
