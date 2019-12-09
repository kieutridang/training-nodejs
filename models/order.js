var mongoose = require('mongoose');
var { client, store } = require('./modelsConstants');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var orderSchema = new Schema({
    clientId: {
        type: ObjectId,
        required: true,
        ref: client
    },
    storeId: {
        type: ObjectId,
        required: true,
        ref: store
    },
    status: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    discount: Number,
});

var Order = mongoose.model('order', orderSchema);

module.exports = Order