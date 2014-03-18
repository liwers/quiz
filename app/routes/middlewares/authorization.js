'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'Vous n\'êtes pas autorisé à faire cette action');
    }
    next();
};
