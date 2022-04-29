const express = require('express');
const config = require('../config');
const user = require('./components/user/network')

// initialization server
const app = express();

// ROUTES
app.use('/api/user', user);

// LISTENING
app.listen(config.api.port, () => {
    console.log(`Listening on port ${config.api.port}`);
});