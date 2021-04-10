
const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Tasks } = Operations;
    const { TASK_NOT_FOUND } = ErrorMessages;
    
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