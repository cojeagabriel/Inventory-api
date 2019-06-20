'use strict';
const port = 8000;

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser'); // middleware, req.body
const cors = require('cors'); // cross origin resource sharing

let contacts = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

router.get('/', (req, res)=>{
    res.json(contacts);
});

router.get('/:id', (req, res)=>{

    let id = req.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == id
    })[0];
    
    if(!contact){
        res.status(404).json({message: 'No contact found with this id'});
    }

    res.json(contact);
});

router.post('/', (req, res)=>{
    let contact = {
        id: contacts.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        website: req.body.website
    }

    contacts.push(contact);

    res.json(contact);
});

router.put('/:id', (req, res)=>{
    let id = req.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == id
    })[0];

    if (!contact) {
        res.status(404).json({
            message: 'No contact found with this id'
        });
    }

    let index = contacts.indexOf(contact);

    let keys = Object.keys(req.body);

    keys.forEach(key => {
        contact[key] = req.body[key];
    });

    contacts[index] = contact;

    res.json(contacts[index]);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == id
    })[0];

    if (!contact) {
        res.status(404).json({
            message: 'No contact found with this id'
        });
    }
    let index = contacts.indexOf(contact);

    contacts.splice(index, 1);
    res.json({message: 'User with ' + id + ' was deleted'});
});

app.use('/.netlify/functions/server', router);

// app.listen(port);

module.exports.handler = serverless(app);