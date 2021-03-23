const response = require('../../app/response');
const Status = require('../../constants/HttpCodes');
const {BOARD_NOT_FOUND} = require('../../constants/ErrorMessages');
const {Boards} = require('../../operations');

const execute = async (req, res) => {
    try {
        const { boardId } = req.params;
        const { title, description } = await Boards.get({ _id: boardId });

        if(!title)
            throw BOARD_NOT_FOUND;

        response(res, Status.OK, {title, description});

    } catch (error) {
        if(error == BOARD_NOT_FOUND)
            return response(res, Status.NOT_FOUND, BOARD_NOT_FOUND);
            
        response(res, Status.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = execute;