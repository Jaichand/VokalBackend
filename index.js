var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user.js');
var location = require('./models/location.js');
var port = process.env.PORT || 8080
var routes = require('./routes/routes.js')
var mongoUrl = config.mongo.url + config.mongo.dbName;
console.log("mongoUrl", mongoUrl);
mongoose.connect(mongoUrl);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function(req, res) {
  // create a sample user
  var nick = new User({
    firstName: 'Nick',
    lastName: 'Cerminara',
    email: 'jaysamriya21@gmail.com',
    password: 'password'
  });
  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});
app.use('/api', routes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
