const express = require('express');
const session = require('express-session')
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/model.js').User;

//EXPRESS//////////////////////////////////////////////////////////////////
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({ secret: 'derpy', resave: true }));
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//MONGOOSE//////////////////////////////////////////////////////////////////
if (! process.env.mongodb_uri) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

mongoose.connect(process.env.mongodb_uri);

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});

mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

//PASSPORT//////////////////////////////////////////////////////////////////
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/', authRoutes);
app.use('/', apiRoutes);

// START THE SERVER///////////////////////////////////////////////////////
const server = app.listen(3000, (err) => {
  if(err) {
    console.log('Error running server', err);
  }
    console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});

module.exports = { server };
require('./socket.js');
