const express = require('express');
const User = require('./models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// this file contains all of the routes used for the different modules of the project

// Middleware for authenticating using JWT
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'mySecret', (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~ 1.User Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// registration:
router.post('/register', (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
    });

    newUser.save().then((user) => {
        if (user) {
            console.log("user saved successfully!");
            res.json({ message: "user saved successfully!" });
        }
        else {
            console.log("user not saved!");
            res.json({ message: "user not saved!" });
        }
    });
});

// login with JWT-based authentication:
router.post('/login', (req, res) => {

    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        if (user) {
            if (user.blocked) {
                res.sendStatus({ message: "You are blocked!" });
            }
            const payload = { id: user.id, username: user.username, admin: user.admin };
            const options = { expiresIn: '1h' };
            const secret = 'mySecret';
            const token = jwt.sign(payload, secret, options);
            res.json({ token: token });
        }
        else {
            res.sendStatus(404);
        }
    });
});

// User profile retrieval

router.get('/user/:id', authenticate, (req, res) => {

    if (!req.user.admin) {
        return res.sendStatus(403);
    }

    User.findOne({ username: req.params.id }).then((user) => {
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    });
});

// User profile update:

router.put('/user/:id', authenticate, (req, res) => {

    User.findOne({ username: req.params.id }).then((user) => {
        if (user) {
            if (user.username != req.user.username && !req.user.admin) {
                console.log("You are not the owner of this blog!");
                return res.sendStatus(403);
            }
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save().then((user) => {
                if (user) {
                    console.log("user updated successfully!");
                    res.json({ message: "user updated successfully!" });
                }
                else {
                    console.log("user not updated!");
                    res.json({ message: "user not updated!" });
                }
            });
        }
        else {
            res.sendStatus(404);
        }
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~ 2.Admin Panel: ~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~ 3.Flight Management Panel: ~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~ 4.Super Admin Panel: ~~~~~~~~~~~~~~~~~~~~~~~



module.exports = router;