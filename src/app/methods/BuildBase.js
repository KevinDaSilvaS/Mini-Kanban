const response = require('../response');
const Status = require('../../constants/HttpCodes');
const ErrorMessages = require('../../constants/ErrorMessages');
const Operations = require('../../operations');
const AmqpBroker = require('../../operations/rabbit-mq/RabbitMqOperations');
const BrokerInfo = require('../../operations/rabbit-mq/BrokerInfo');

const dependencies = {
    response,
    Status,
    ErrorMessages,
    Operations,
    AmqpBroker,
    BrokerInfo,
    channel: AmqpBroker.connection()
}

const buildBase = async (route, req, res) => {
    const values = Object.values(route.validations);
    for (let i = 0; i < values.length; i++) {
        const result = await values[i](req, res);
        if (!result)
            return;
    }

    await route.controller(req, res, dependencies);
}

module.exports = buildBase;