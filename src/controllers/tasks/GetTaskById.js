const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {TASK_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {boardId, taskId} = req.params;
        const {task, description, status} = await Tasks.get({
            _id: taskId, boardId});

        if(!task) response(res, Status.NOT_FOUND, TASK_NOT_FOUND);

        response(res, Status.OK, {task, description, status});
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;