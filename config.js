module.exports = {
    api: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        secretkey: process.env.SECRETKEY || 'secretkey'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'thepassword',
        database: process.env.MYSQL_DATABASE || 'microservices'
    }
}