const execute = async (req, res, dependencies) => {
    const { response, Status, Operations } = dependencies;
    const { Boards } = Operations;

    try {
        const { page, limit } = req.query;

        let boards = await Boards.getPaginated({}, page, limit);

        boards = boards.map((board) => {
            const { _id, title, description } = board;
            return { boardId: _id, title, description };
        });

        response(res, Status.OK, boards);
        
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;