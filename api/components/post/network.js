const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);

function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 201);
        }).catch(next);
}

module.exports = router;