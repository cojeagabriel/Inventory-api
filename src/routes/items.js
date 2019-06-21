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

    Item.find().sort([['position', 'descending']]).exec(function (err, items) {
        console.log(items.length);
        if (err) {
            res.json({
                message: err.errors
            })
        }
        else{
            let position = 1;
            if (items.length > 0){
                position = items[0].position + 1;
            }

            const newItem = new Item({
                name: req.body.name,
                position: position,
                available: false
            });

            newItem.save((err, item) => {
                if (err) {
                    res.json({
                        message: err.errors
                    })
                } else {
                    res.json(item);
                }
            });
            
        }
        
    });
    
});

router.put('/:id', (req, res)=>{
    Item.update({
        _id: req.params.id
    }, {
        name: req.body.name,
        position: req.body.position,
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
    }, (err) => {
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