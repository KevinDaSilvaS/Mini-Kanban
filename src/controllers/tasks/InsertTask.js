const axios = require('axios');
const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {TASK_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    
    try {
        const paramsBoardId = req.params.boardId;

        const board = await axios.get(`
        http://localhost:1747/boards/${paramsBoardId}`);

        if(board.statusCode != 200) {
            response(res, Status.NOT_FOUND, TASK_NOT_FOUND);
            return;
        }

        const { _id, title, description, boardId, status } = await Tasks.insert({
            ...req.body, boardId: paramsBoardId });

        const insertedTask = { taskId: _id, title, description, boardId, status };
        response(res, Status.CREATED, insertedTask);

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;