const controllers = require('../controllers');
const validations = require('../validations');

const routes = [
    //boards
    {
        route: '/boards',
        validations: {
            query: validations.getAllQuery
        },
        controller: controllers.GetBoards, 
        method: 'GET'
    },
    {
        route: '/boards',
        validations: {
            body: validations.insertBoard
        },
        controller: controllers.InsertBoard, 
        method: 'POST'
    },
    {
        route: '/boards/:boardId',
        validations: {},
        controller: controllers.DeleteBoard, 
        method: 'DELETE'
    },
    {
        route: '/boards/:boardId',
        validations: {
            body: validations.updateBoard
        },
        controller: controllers.UpdateBoard, 
        method: 'PATCH'
    },
    {
        route: '/boards/:boardId',
        validations: {},
        controller: controllers.GetBoardById, 
        method: 'GET'
    },
    //tasks
    {
        route: '/tasks/:boardId',
        validations: {
            query: validations.getAllQuery
        },
        controller: controllers.GetTasks, 
        method: 'GET'
    },
    {
        route: '/tasks/:boardId',
        validations: {
            body: validations.insertTask
        },
        controller: controllers.InsertTask, 
        method: 'POST'
    },
    {
        route: '/tasks/:taskId',
        validations: {},
        controller: controllers.DeleteTask, 
        method: 'DELETE'
    },
    {
        route: '/tasks/:taskId',
        validations: {
            body: validations.updateTask
        },
        controller: controllers.UpdateTask, 
        method: 'PATCH'
    },
    {
        route: '/tasks/:boardId/:taskId',
        validations: {},
        controller: controllers.GetTaskById, 
        method: 'GET'
    }
];

module.exports = routes;