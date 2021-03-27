const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {TASK_NOT_FOUND, BOARD_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Boards, Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {taskId} = req.params;
        const paramsBoardId = req.params.boardId;

        const board = await Boards.get({ _id: paramsBoardId });

        if(!board.title)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);

        const { title, description, status, boardId } = await Tasks.get({
            _id: taskId, boardId: paramsBoardId });

        if(!title) return response(res, Status.NOT_FOUND, TASK_NOT_FOUND);

        return response(res, Status.OK, {title, description, status, boardId});
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;