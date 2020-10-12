const {boardPatchBody} = require('../../schemas/boards/BoardSchema');
const Status = require('../../constants/HttpCodes');
const response = require('../../app/response');

const execute = (req, res) => {
    const validation = boardPatchBody.validate(req.body);

    if(validation.error){
        response(res, Status.BAD_REQUEST, validation.error.details[0].message);
        throw new Error(validation.error.details);
    }

    return true;
}

module.exports = execute;