const User = require('../models/model.js').User
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
  (username, password, done) => {
    console.log('THIS IS USERNAME', username)
    console.log('THIS IS PASSWORD', password)
  const userData = {
    username: username,
    password: password
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) {
      return done(err);
      console.log('Error saving new user', err)
    } else {
      return done(null);
      console.log('New user saved in database')
    }

  });
});
