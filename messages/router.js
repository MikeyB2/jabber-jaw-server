const express = require('express');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
const { instanceLocator, securityKey } = require('../config');
const { Message } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const chatkit = new Chatkit.default({
    instanceLocator: instanceLocator,
    key: securityKey,
})

const createAuthToken = function (user) {
    return jwt.sign({ user }, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const localAuth = passport.authenticate('local', { session: false });


// Post new message
router.get('/', localAuth, (req, res) => {
    Message.find({
        username: req.query.username
    })
        .then(messages => {
            res.json({
                messages: messages.map(message => message.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

//GET messages
router.get('/:id', localAuth, (req, res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

// POST New messages
router.post('/', localAuth, (req, res) => {
    const requiredFields = ['text', 'username', 'roomId'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Message.create({
        roomId: req.body.roomId,
        text: req.body.text,
        username: req.body.username
    })
        .then(message => res.status(201).json(message.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

//DELETE messages
router.delete('/:id', localAuth, (req, res) => {
    Message.findByIdAndRemove(req.params.id).then(() => {
        console.log(`Deleted List Item with id \`${req.params.id}\``);
        res.status(204).end();
    });
});


module.exports = { router };