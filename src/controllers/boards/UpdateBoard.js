const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {ERROR_UPDATE_BOARD} = require('../../constants/ErrorMessages');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {boardId} = req.params;
        if(await Boards.update({_id: boardId} ,req.body)) {
            return response(res, Status.NO_CONTENT, undefined);
        }

        response(res, Status.BAD_REQUEST, ERROR_UPDATE_BOARD);

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;