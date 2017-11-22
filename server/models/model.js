const mongoose = require('mongoose');
const connect = process.env.mongodb_uri;
const Schema = mongoose.Schema;

// define the User model schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  }
});

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  current: {
    type: Object,
  },
  previous: {
    type: Object
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  collaborators: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
});

var User = mongoose.model('User', UserSchema);
var Doc = mongoose.model('Doc', DocumentSchema);

module.exports = {User, Doc}
