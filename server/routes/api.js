const express = require('express');
const User = require('../models/model.js').User;
const Doc = require('../models/model.js').Doc;

const router = new express.Router();

router.get('/api/home', (req, res) => {
  res.status(200).json({
    message: req.user
  });
});

router.get('/api/home/getdocs', (req, res) => {
  Doc.find({$or: [{owner: req.user._id}, {collaborators: req.user._id}]}, function(err, docs) {
    if(err) {
      console.log('Error finding doc in get route', err)
    } else {
      res.status(200).json({
        message: docs
      });
    }
  })
});

router.get('/api/home/one/:docId', (req, res) => {
  Doc.findOne({_id: req.params.docId})
    .populate('owner')
    .populate('collaborators')
    .exec(function(err, doc) {
      if(err) {
        console.log('Error finding doc in get route', err)
      } else {
        res.status(200).json({
          message: doc
        });
    }
  })
});

router.post('/api/home/adddoc', (req, res) => {
  let newDoc = new Doc({
    title: req.body.title,
    owner: req.body.owner,
    collaborators: req.body.owner,
    current: 'Placeholder',
    previous: {dateTime: 'Previous'}
  })

  newDoc.save(function(err, item) {
    if(err) {
      console.log('There was an error adding new doc to MongoDb', err)
      return err
    } else {
      console.log('Added new doc to MongoDb!', item)
      res.status(200).json({
        message: item._id
      });
    }
  })
});

router.post('/api/home/savedoc', (req, res) => {
  Doc.findOneAndUpdate({_id: req.body.id}, {current: req.body.current}, function(err, update) {
    if(err) {
      console.log('There was an error updating the doc in Mongo', err)
      return err
    } else {
      console.log('Updated doc in MongoDb!', update)
      res.status(200).json({
        message: update
      });
    }
  })
});

router.post('/api/home/addshared', (req, res) => {
  Doc.findOneAndUpdate({_id: req.body.docId}, {collaborators: req.body.userId}, function(err, update) {
    if(err) {
      console.log('There was an error adding a collaborator in MongoDb')
    } else {
      console.log('Updated user as a new collaborator in MongoDb', update)
      res.status(200).json({
        message: update
      });
    }
  })
})

module.exports = router;
