const BoardSchema = require('./boards/BoardSchema');
const TaskSchema = require('./tasks/TaskSchema');
const SharedSchema = require('./shared/SharedSchema');

module.exports = {
    ...BoardSchema, 
    ...TaskSchema, 
    ...SharedSchema
};