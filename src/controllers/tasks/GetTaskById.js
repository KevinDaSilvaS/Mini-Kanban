const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Boards, Tasks } = Operations;
    const { TASK_NOT_FOUND, BOARD_NOT_FOUND } = ErrorMessages;

    try {
        const {taskId} = req.params;
        const paramsBoardId = req.params.boardId;

        const board = await Boards.get({ _id: paramsBoardId });

        if(!board)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);

        const task = await Tasks.get({
            _id: taskId, boardId: paramsBoardId });

        if(!task) return response(res, Status.NOT_FOUND, TASK_NOT_FOUND);

        const { title, description, status, boardId } = task;

        return response(res, Status.OK, {title, description, status, boardId});
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;