const User = require('../models/model.js').User
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
  (username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim()
  };

  return User.findOne({ username: userData.username, password: userData.password }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';
      console.log('User not found');
      return done(error);
    } else {
      console.log('User was found', user);
      return done(null, user)
    }
  });
});
