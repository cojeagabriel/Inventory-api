const express = require('express');
const router = express.Router();

var Item = require('../models/item');
var config = require('../config');

router.get('/', (req, res)=>{
    Item.find({}, (err, items) => {
        res.json(items);
    });
});

module.exports = router;