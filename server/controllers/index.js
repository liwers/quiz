'use strict';

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify({
            name: req.user.name,
            _id:req.user._id,
            username: req.user.username,
            roles: (req.user ? req.user.roles : ['annonymous'])
        }) : 'null',
    });
};
