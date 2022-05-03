'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secretkey = config.jwt.secretkey;

function sign(data) {
    jwt.sign(data, secretkey);
}

function verify(token) {
    return jwt.verify(token, secretkey);
}

const check = {
    own: function (req, owner) {
        //
        const decoded = decodeHeader(req);
        // verify if is or not the owner
        if (decoded.id !== owner) {
            throw error('You are not the owner', 401);
            //throw new Error('You are not the owner');

        }
    },
    logged: function (req, owner) {
        //
        const decoded = decodeHeader(req);
        return decoded;
    }
}

function getToken(auth) {
    // Bearer token
    if (!auth) {
        throw new Error('No token provided');
    }

    if (auth.indexOf('Bearer') === -1) {
        throw new Error('Invalid Format');
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    if (authorization) {
        const token = getToken(authorization);
        const decoded = verify(token);

        req.user = decoded;
        return decoded;
    }
}

module.exports = {
    sign,
    check
}