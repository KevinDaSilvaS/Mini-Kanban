const TaskModel = require('../../../database/mongo/models/Tasks');
const OperationsBaseMongo = require('../OperationsBaseMongo');

class TasksMongo extends OperationsBaseMongo {
    constructor() {
        super(TaskModel);
    }
}

module.exports = TasksMongo;