const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {BOARD_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Boards, Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { boardId } = req.params;
        await Tasks.delete({ boardId });

        const {n} = await Boards.delete({ _id: boardId });
        if(!n || n <= 0) response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);

        response(res, Status.NO_CONTENT, undefined);
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;