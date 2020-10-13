const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const Operations = require('../../operations/mongo/boards/BoardsMongo');
const boardOperations = new Operations();

const execute = async (req, res) => {
    try {
        const {_id, title, description} = await boardOperations.insert(req.body);
        const insertedBoard = {boardId: _id, title, description};
        response(res, Status.CREATED, insertedBoard);
    } catch (error) {
        response(res, Status.CREATED, error);
    }
}

module.exports = execute;