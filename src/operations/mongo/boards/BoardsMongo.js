const BoardModel = require('../../../database/mongo/models/Boards');

class BoardsMongo extends OperationsBaseMongo {
    constructor() {
        super(BoardModel);
    }
}

module.exports = BoardsMongo;