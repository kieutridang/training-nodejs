var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true,
        default: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    description: String,
});

var Product = mongoose.model('product', productSchema);

module.exports = Product