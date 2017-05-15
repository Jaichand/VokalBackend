var jwt = require('jsonwebtoken');
var express = require('express');
var User = require('../models/user.js');
var location = require('../models/location.js');
var config = require('../config');
var Router = express.Router();
app = express()
app.set('superSecret', config.secret);

Router.post('/signUp', function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err, newUser) {
    if (err) throw err;
    console.log("User created successfully");
    res.json({success: true, user: newUser});
  });
});

Router.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if (err)
     throw err;
    if (!user){
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    else if (user) {
      if(user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
      else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '30d'
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user
        });
      }
    }
  })
});

Router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

Router.get('/', function(req,res){
 res.json({ message: 'Welcome to the coolest API on earth!' });
});

Router.get('/user', function(req, res){
  User.find({_id: req.query._id}, function(err, user){
    if (err){
      console.log("Error while getting user", err);
      return
    }
    res.json(user);
  })
});
module.exports = Router;
