// this is a joke dummy file
'use strict';

const db = {
    'user': [
        {
            id: '1',
            name: 'John'
        }
    ]
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0];
}

async function upsert(table, data) {
    db[table].push(data);
}

async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}