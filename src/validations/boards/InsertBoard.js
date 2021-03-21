const {boardPostBody} = require('../../schemas/boards/BoardSchema');
const Status = require('../../constants/HttpCodes');
const response = require('../../app/response');

const execute = (req, res) => {
    const validation = boardPostBody.validate(req.body);

    if(validation.error){
        response(res, Status.BAD_REQUEST, validation.error.details[0].message);
        return false;
    }

    return true;
}

module.exports = execute;