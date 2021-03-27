const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {Tasks, Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const { boardId } = req.params;

        const board = await Boards.get({ _id: boardId });

        if(!board.title)
            throw BOARD_NOT_FOUND;

        let tasks = await Tasks.getPaginated({ boardId }, page, limit);

        tasks = tasks.map((task) => {
            const { _id, 
                title, 
                description, 
                status, 
                boardId } = task;

            return { taskId: _id, title, description, status, boardId };
        });

        response(res, Status.OK, tasks);
        
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;