const amqp = require('amqplib');
require('dotenv/config');
const { RABBIT_HOST } = process.env;

const connect = (url = `amqp://${RABBIT_HOST}`) => {
    return new Promise((resolve, reject) => {
        amqp.connect(url)
            .then(conn => resolve(conn))
            .catch(err => reject(err))
    });
}

module.exports = connect