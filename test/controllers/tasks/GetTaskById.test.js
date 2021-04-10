const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const GetTaskById = require('../../../src/controllers/tasks/GetTaskById');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
        Tasks: {
            get: jest.fn(() => ({}))
        },
        Boards: {
            get: jest.fn(() => ({})) 
        }
    }
}

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    params: {
        taskId: 'task_id',
        boardId: 'board_id',
    }
}

describe('Sucess', () => {
    test('Should get board successfully', async () => {

        const board = await GetTaskById(req, res, dependencies);
        expect(dependencies.Operations.Tasks.get).toHaveBeenCalled();
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(board.status).toEqual(Status.OK);
        
    });
});

describe('Fail', () => {
    test('Should return 404 error board not found', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => (null));
        const task = await GetTaskById(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(task).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.BOARD_NOT_FOUND
        });
        
    });

    test('Should return 404 error task not found', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => ({}));
        dependencies.Operations.Tasks.get = jest.fn(() => (null));
        const task = await GetTaskById(req, res, dependencies);
        expect(dependencies.Operations.Tasks.get).toHaveBeenCalled();
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(task).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.TASK_NOT_FOUND
        });
        
    });

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => {
            throw new Error("Database not available");
        });
        await GetTaskById(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
    });
});