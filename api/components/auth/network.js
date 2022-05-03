const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/login', login);


function login(req, res) {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 201);
        })
        .catch(error => {
            response.error(req, res, 'Informacion Invalida', 401);
        });
}



module.exports = router;