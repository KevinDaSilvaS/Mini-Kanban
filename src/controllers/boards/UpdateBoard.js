const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {boardId} = req.params;
        if(await Boards.update({_id: boardId} ,req.body)) {
            return response(res, Status.OK, {});
        }

        response(res, Status.BAD_REQUEST, "Unable to update user.");

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;