const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {TASK_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Tasks} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { taskId } = req.params;

        const {n} = await Tasks.delete({ _id: taskId });
        if(!n || n <= 0) {
            return response(res, Status.NOT_FOUND, TASK_NOT_FOUND);
        }

        return response(res, Status.NO_CONTENT, undefined);
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;