const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const GetTasks = require('../../../src/controllers/tasks/GetTasks');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
        Tasks: {
            getPaginated: jest.fn(() => ([{
                _id: '_id', 
                title: 'title', 
                description: 'description', 
                status: 'status', 
                boardId: 'boardId'
            }]))
        },
        Boards: {
            get: jest.fn(() => ({title: 'title'})) 
        }
    }
}

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    params: {
        boardId: 'board_id'
    },
    query: {
        limit: 1,
        page: 1,
    }
}

describe('Sucess', () => {
    test('Should get tasks successfully', async () => {

        const tasks = await GetTasks(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(tasks.status).toEqual(Status.OK);
        
    });
});

describe('Fail', () => {
    test('Should return 404 error board not found', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => (null));
        const tasks = await GetTasks(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(tasks).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.BOARD_NOT_FOUND
        });
        
    });

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => {
            throw new Error("Database not available");
        });
        await GetTasks(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
    });
});