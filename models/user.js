var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

UserSchema = new Schema({
    firstName : {
      type: String,
      required: true
    },
    lastName : {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
      validate: [
        validate({
          validator: 'isEmail'
        })
      ]
  },
  password:{
    type: String,
    required: false
  }
});
Users = mongoose.model('User', UserSchema);
module.exports = Users;
