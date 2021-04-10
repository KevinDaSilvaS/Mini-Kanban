
const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Boards, Tasks } = Operations;
    const { BOARD_NOT_FOUND } = ErrorMessages;
    
    try {
        const { page, limit } = req.query;
        const { boardId } = req.params;

        const board = await Boards.get({ _id: boardId });

        if(!board || !board.title)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);

        let tasks = await Tasks.getPaginated({ boardId }, page, limit);

        tasks = tasks.map((task) => {
            const { _id, 
                title, 
                description, 
                status, 
                boardId } = task;

            return { taskId: _id, title, description, status, boardId };
        });

        return response(res, Status.OK, tasks);
        
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;