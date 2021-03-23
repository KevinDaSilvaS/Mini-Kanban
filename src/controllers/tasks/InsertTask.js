const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {BOARD_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Tasks, Boards} = require('../../operations');

const execute = async (req, res) => {
    
    try {
        const paramsBoardId = req.params.boardId;
        
        const board = await Boards.get({ _id: paramsBoardId });

        if(!board.title)
            throw BOARD_NOT_FOUND;

        const { _id, title, description, boardId, status } = await Tasks.insert({
            ...req.body, boardId: paramsBoardId });

        const insertedTask = { taskId: _id, title, description, boardId, status };
        response(res, Status.CREATED, insertedTask);

    } catch (error) {
        if(error == BOARD_NOT_FOUND)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;