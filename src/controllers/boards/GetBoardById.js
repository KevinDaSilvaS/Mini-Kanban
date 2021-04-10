const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Boards } = Operations;
    const { BOARD_NOT_FOUND } = ErrorMessages;

    try {
        const { boardId } = req.params;
        const board = await Boards.get({ _id: boardId });

        if(!board)
            throw BOARD_NOT_FOUND;

        const { title, description } = board;

        response(res, Status.OK, {title, description});

    } catch (error) {
        if(error == BOARD_NOT_FOUND)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);
            
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;