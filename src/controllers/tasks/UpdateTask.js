
const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Tasks } = Operations;
    const { ERROR_UPDATE_TASK } = ErrorMessages;

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