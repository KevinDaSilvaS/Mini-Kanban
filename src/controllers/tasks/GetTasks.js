const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {boardId} = req.params;
        let tasks = await Tasks.getAll({boardId});
        tasks = tasks.map((task) => {
            const {_id, title, description, status, boardId} = task;
            return {taskId: _id, title, description, status, boardId};
        });

        response(res, Status.OK, tasks);
        
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;