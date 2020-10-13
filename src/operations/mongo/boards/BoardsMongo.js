const BoardModel = require('../../../database/mongo/models/Boards');
const OperationsBaseMongo = require('../OperationsBaseMongo');

class BoardsMongo extends OperationsBaseMongo {
    constructor() {
        super(BoardModel);
    }
}

module.exports = BoardsMongo;