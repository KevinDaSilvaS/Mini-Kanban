const amqp = require('amqplib');
const { exchanges } = require('./BrokerInfo');

const connect = (url = 'amqp://localhost') => {
  return new Promise((resolve, reject) => {
    amqp.connect(url)
      .then(conn => resolve(conn))
      .catch(err => reject(err))
  });
}

const createChannel = conn => {
  return new Promise((resolve, reject) => {
    conn.createChannel()
      .then(channel => resolve(channel))
      .catch(err => reject(err))
  });
}

const assertExchange = (channel, exchange, type, config) => {
    return new Promise((resolve, reject) => {
        channel.assertExchange(exchange, type, config)
        .then(success => resolve(success))
        .catch(err => reject(err))
    });
}

const connection = async () => {
  const conn = await connect();
  const channel = await createChannel(conn);
  const arrExchanges = Object.values(exchanges);

  arrExchanges.map(async ({exchange, type, config}) => {
    await assertExchange(channel, exchange, type, config)
  });
  return channel;
}

const publish = async (channel, exchange, topic, msg) => {
  channel.publish(exchange, topic, Buffer.from(msg));
}

module.exports = { connection, publish }