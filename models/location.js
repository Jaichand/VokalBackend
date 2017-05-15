var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var minute = require('mongoose-minute');

location = new Schema({
  name : {
    type: String
  },
  location: {
    type:{
      type: [String]
    },
    coordinates: [Number]
  },
  createdUser: {
    _id: mongoose.Schema.Types.ObjectId
  }
});

minute(location, {
  createdAt: 'createdAt'
});

Locations = mongoose.model('location', location);
module.exports = Locations;
