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
    ShoppingList.find({
        username: req.query.username
    })
        .then(listItems => {
            res.json({
                listItems: listItems.map(listItem => listItem.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

//GET shopping-list item
router.get('/:id', localAuth, (req, res) => {
    ShoppingList.findById(req.params.id)
        .then(listItem => res.json(listItem.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

// POST New Shopping-list item
router.post('/', localAuth, (req, res) => {
    const requiredFields = ['ingredient', 'username'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    ShoppingList.create({
        ingredient: req.body.ingredient,
        amount: req.body.amount,
        username: req.body.username
    })
        .then(listItem => res.status(201).json(listItem.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: 'WHAT DID YOU DO?!'
            });
        });
});

//DELETE Shopping-list item
router.delete('/:id', localAuth, (req, res) => {
    ShoppingList.findByIdAndRemove(req.params.id).then(() => {
        console.log(`Deleted List Item with id \`${req.params.id}\``);
        res.status(204).end();
    });
});

//PUT update shopping-list item
router.put('/:id', localAuth, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }

    const updated = {};
    const updateableFields = ['ingredient', 'amount', 'checked'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    ShoppingList.findByIdAndUpdate(
        req.params.id, {
            $set: updated
        }, {
            new: true
        }
    )
        .then(updatedListItem => res.status(204).end())
        .catch(err =>
            res.status(500).json({
                message: 'WHAT DID YOU DO?!'
            })
        );
});

module.exports = { router };