const TaskModel = require('../../../database/mongo/models/Tasks');

class TasksMongo extends OperationsBaseMongo {
    constructor() {
        super(TaskModel);
    }
}

module.exports = TasksMongo;