var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Item', new Schema({

    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }

}));