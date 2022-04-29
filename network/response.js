exports.success = function (req, res, message, status) {
    let statusCode = status || 201;
    let statusMessage = message || 'Success';

    res.status(status).send({
        body: statusMessage,
        status: statusCode,
        error: false
    })
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal Server Error';

    res.status(status).send({
        body: message,
        status: statusCode,
        error: true
    })
}