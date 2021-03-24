const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {ERROR_UPDATE_BOARD} = require('../../constants/ErrorMessages');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { boardId } = req.params;

        const board = await Boards.update({ _id: boardId } ,req.body);

        if(board.ok > 0)
            return response(res, Status.NO_CONTENT, undefined);

        throw ERROR_UPDATE_BOARD;

    } catch (error) {
        if(error == ERROR_UPDATE_BOARD)
            return response(res, Status.BAD_REQUEST, ERROR_UPDATE_BOARD);

        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;