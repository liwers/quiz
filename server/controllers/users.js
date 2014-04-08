'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('password', 'Le mot de passe doit faire entre 4 et 20 caractères').len(4, 20);
    req.assert('username', 'Le login ne doit pas dépasser 20 caractères').len(1,20);
    req.assert('confirmPassword', 'La confirmation du mot de passe doit être identique au mot de passe').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    user.roles = ['authenticated'];
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Login déjà utilisé');
                    break;
                default:
                    res.status(400).send('Veuillez remplir les champs requis');
            }

            return res.status(400);
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
        res.status(200);
    });
};
/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

/**
 * Add admin if no user with admin roles
 */
exports.addAdmin = function(req, res) {
    User.find({roles: 'admin'}).count().exec(function(err, count) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (count === 0) {
                var user = req.user;
                user.roles.push('admin');
                user.save(function(err) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    }
                });
            }
            return res.redirect('/');
        }
    });
};
