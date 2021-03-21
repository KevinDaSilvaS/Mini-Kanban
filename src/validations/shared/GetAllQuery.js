const {getAllQuery} = require('../../schemas/');
const Status = require('../../constants/HttpCodes');
const response = require('../../app/response');

const execute = (req, res) => {
    const validation = getAllQuery.validate(req.query);

    if(validation.error){
        response(res, Status.BAD_REQUEST, validation.error.details[0].message);
        throw new Error(validation.error.details);
    }

    return true;
}

module.exports = execute;