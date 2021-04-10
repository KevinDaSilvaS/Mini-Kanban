const execute = async (req, res, dependencies) => {
    const { response, Status, Operations } = dependencies;
    const { Boards } = Operations;

    try {
        const { _id, title, description } = await Boards.insert(req.body);
        
        const insertedBoard = { boardId: _id, title, description };
        response(res, Status.CREATED, insertedBoard);

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;