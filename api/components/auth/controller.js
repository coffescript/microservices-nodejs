'use strict';

const bcrypt = require('bcrypt');

// const store = require('../../../store/dummy');

const auth = require('../../../auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username });
        if (data.password === password) {
            // Compare password
            return bcrypt.compare(password, data.password)
                .then(comparison => {
                    if (comparison === true) {
                        // Generate token
                        return auth.sign(data);
                    } else {
                        throw new Error('Informacion invalida.');
                    }
                })

        } else {
            throw new Error('Informacion invalida');
        }
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert();
    }

    return {
        upsert,
        login
    }
}
