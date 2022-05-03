const express = require('express');

const secure = require('./secure');
const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);
router.post('/follow/:id', secure('FOLLOW'), follow);
router.post('/following/:id', follow);
router.get('/:id', get);
router.post('/:add', upsert);
router.post('/', secure('UPDATE'), upsert);


function list(req, res, next) {
    Controller.list()
        .then(list => {
            response.success(req, res, list, 201);
        })
        .catch(next);
}

function get(req, res) {
    const { id } = req.params;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(next)
}

function upsert(req, res) {
    const { id, firstName, lastName } = req.body;
    Controller.get(id)
        .then(user => {
            response.success(req, res, user, 201);
        })
        .catch(next)
}

function follow(req, res, next) {
    Controller.follow(req, user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        }).catch(next);
}

function following(req, res, next) {
    Controller.following(req, user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201)
        }).catch(next);
}

module.exports = router;