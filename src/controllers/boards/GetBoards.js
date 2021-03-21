const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const {page, limit} = req.query;
        let boards = await Boards.getPaginated({}, page, limit);
        boards = boards.map((board) => {
            const {_id, title, description} = board;
            return {boardId: _id, title, description};
        });

        response(res, Status.OK, boards);
        
    } catch (error) {
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;