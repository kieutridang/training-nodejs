var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    deliveryAddress: String,
});

var Client = mongoose.model('client', clientSchema);

module.exports = Client