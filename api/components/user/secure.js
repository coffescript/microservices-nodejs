'use strict';

const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'UPDATE':
                const owner = req.body.id;
                auth.check.own(req, owner);
                break;
            case 'FOLLOW':
                auth.check.logged(req);
            default:
                next();
        }
    }
    return middleware;
}