const express = require('express');
const router = express.Router();

var Item = require('../models/item');

router.get('/', (req, res)=>{
    Item.find({}, (err, items) => {
        if(err){
            res.json({message: err.errors})
        }
        else{
            res.json(items);
        }
    });
});

router.get('/:id', (req, res)=>{
    Item.findOne({_id: req.params.id}, (err, item) => {
        if(err){
            res.json({message: err.errors})
        }
        else{
            res.json(item);
        }
    });
});

router.post('/', (req, res)=>{
    const newItem = new Item({
        name: req.body.name,
        available: false
    });

    newItem.save((err, item) => {
        if(err){
            res.json({message: err.errors})
        }
        else{
            res.json(item);
        }
    });
});

router.put('/:id', (req, res)=>{
    Item.update({
        _id: req.params.id
    }, {
        name: req.body.name,
        available: req.body.available
    }, (err, item)=>{
        if (err) {
            res.json({
                message: err.errors
            })
        } else {
            res.json(item);
        }
    });
});

router.delete('/:id', (req, res)=>{
    Item.remove({
        _id: req.params.id
    }, (err)=>{
        if (err) {
            res.json({
                message: err.errors
            })
        } else {
            res.json({
                success: true,
                message: 'Item with the id ' + req.params.id + ' has been deleted'
            });
        }
    });
});

module.exports = router;