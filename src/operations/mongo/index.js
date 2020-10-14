const Boards = require('./boards/BoardsMongo');
const Tasks = require('./tasks/TasksMongo');

module.exports = {
    Boards: new Boards(),
    Tasks: new Tasks(),
}