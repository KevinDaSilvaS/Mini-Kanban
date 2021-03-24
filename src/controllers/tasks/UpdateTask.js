const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {ERROR_UPDATE_TASK} = require('../../constants/ErrorMessages');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Tasks.update({ _id: taskId } ,req.body);
        if(task.ok > 0)
            return response(res, Status.NO_CONTENT, undefined);

        throw ERROR_UPDATE_TASK;

    } catch (error) {
        if(error == ERROR_UPDATE_TASK)
            return response(res, Status.BAD_REQUEST, ERROR_UPDATE_TASK);

        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;