const BoardSchema = require('./boards/BoardSchema');
const TaskSchema = require('./tasks/TaskSchema');

module.exports = {...BoardSchema, ...TaskSchema};