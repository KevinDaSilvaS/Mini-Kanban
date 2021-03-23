const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { _id, title, description } = await Boards.insert(req.body);
        
        const insertedBoard = { boardId: _id, title, description };
        response(res, Status.CREATED, insertedBoard);

    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;