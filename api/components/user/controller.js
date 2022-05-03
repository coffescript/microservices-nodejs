'use strict';

const auth = require('../auth');

// const store = require('../../../store/dummy');

const TABLE = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
            password: body.password
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: user.password
            })
        }

        return store.upsert(TABLE, user);
    }

    function follow(from, to) {
        store.upsert(TABLE + '_follow', {
            user_From: from,
            user_to: to
        })
    }

    function following(user) {
        const join = {};
        join[TABLE] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };

        return await store.query(TABLE + '_follow', query, join);
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}
