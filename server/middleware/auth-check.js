const User = require('../models/model.js').User

module.exports = (req, res, next) => {
  // if (!req.user) {
  //   console.log('REQ.HEADER', req.headers, 'REQ.PASSPORT', req.passport, 'REQ.SESSION', req.session, 'REQ.USER', req.user, 'REQ.COOKIE', req.cookie)
  //   return res.status(401).end();
  // }
  //
  //   return User.findById(req.user._id, (userErr, user) => {
  //     if (userErr || !user) {
  //       return res.status(401).end();
  //     } else {
  //       console.log('Auth-check success', user)
  //       return next();
  //   }
  // });
};
