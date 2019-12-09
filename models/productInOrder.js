var mongoose = require('mongoose');
var { order, product } = require('./modelsConstants');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productInOrderSchema = new Schema({
    orderId: {
        type: ObjectId,
        required: true,
        ref: order
    },
    productId: {
        type: ObjectId,
        required: true,
        ref: product
    },
    qty: {
        type: Number,
        required: true
    },
    price: Number
});

var ProductInOrder = mongoose.model('productInOrder', productInOrderSchema);

module.exports = ProductInOrder