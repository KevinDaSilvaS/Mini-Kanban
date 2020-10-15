const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {ERROR_UPDATE_TASK} = require('../../constants/ErrorMessages');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {taskId} = req.params;
        if(await Tasks.update({_id: taskId} ,req.body)) {
            return response(res, Status.NO_CONTENT, undefined);
        }

        response(res, Status.BAD_REQUEST, ERROR_UPDATE_TASK);

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;