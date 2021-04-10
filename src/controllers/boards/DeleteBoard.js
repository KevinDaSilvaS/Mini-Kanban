const execute = async (req, res, dependencies) => {
    const { response, Status, ErrorMessages, Operations } = dependencies;
    const { Boards, Tasks } = Operations;
    const { BOARD_NOT_FOUND } = ErrorMessages;

    try {
        const { boardId } = req.params;
        await Tasks.delete({ boardId });

        const {n} = await Boards.delete({ _id: boardId });
        if(!n || n <= 0) {
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);
        }

        return response(res, Status.NO_CONTENT, undefined);
    } catch (error) {
        return response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;