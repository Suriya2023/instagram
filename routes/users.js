var express = require('express');
var router = express.Router();
let mongoose = require('mongoose')
let plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/instgramclon')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  fullname: String,
  bio: String,

  profileimage: String,
  password:String,

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]

})
userSchema.plugin(plm)


module.exports = mongoose.model('user', userSchema);
