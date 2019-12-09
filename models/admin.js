var mongoose = require('mongoose');
var { admin } = require('./modelsConstants');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: Number,
  accessToken: String,
});

var Admin = mongoose.model(admin, adminSchema);

module.exports = Admin