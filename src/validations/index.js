const boards = require('./boards');
const tasks = require('./tasks');
const shared = require('./shared');

module.exports = {...boards, ...tasks, ...shared};