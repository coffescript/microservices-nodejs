const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/:add', upsert);
// router.post('/', upsert);


function list(req, res) {
    Controller.list()
        .then(list => {
            response.success(req, res, list, 201);
        })
        .catch(error => {
            response.error(req, res, error.message, 500);
        });
}

function get(req, res) {
    const { id } = req.params;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(error => {
            response.success(req, res, error.message, 500);
        })
}

function upsert(req, res) {
    const { id, firstName, lastName } = req.body;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(error => {
            response.success(req, res, error.message, 500);
        })
}

module.exports = router;