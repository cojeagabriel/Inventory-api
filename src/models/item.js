var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({

    name: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }

}));