const express = require('express');
const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/auth/post');
const errors = require('../network/errors');

const swaggerUI = require('swagger-ui-express');

// initialization server
const app = express();

const swaggerDocument = require('./swagger.json');

// ROUTES
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use(errors);

// LISTENING
app.listen(config.api.port, () => {
    console.log(`Listening on port ${config.api.port}`);
});