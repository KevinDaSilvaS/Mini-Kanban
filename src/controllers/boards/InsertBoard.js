const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');

const execute = async (req, res) => {
    response(res, Status.CREATED, {oi: "oi"});
}

module.exports = execute;