const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const InsertTask = require('../../../src/controllers/tasks/InsertTask');

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})),
    Status,
    ErrorMessages,
    Operations: {
        Boards: {
            get: jest.fn(() => ({title: 'title'})) 
        },
        Tasks: {
            insert: jest.fn(() => ({ 
                _id: '_id', 
                title: 'title', 
                description: 'description',
                boardId: 'boardId', 
                status: 'status'
            }))
        }
    }
}

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    body: {
    },
    params: {
        boardId: 'board_id'
    }
}

describe('Sucess', () => {
    test('Should insert a task successfully', async () => {

        await InsertTask(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        expect(dependencies.Operations.Tasks.insert).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.CREATED, { 
                                taskId: '_id', 
                                title: 'title', 
                                description: 'description',
                                boardId: 'boardId', 
                                status: 'status'
                            }
        );
        
    });
});

describe('Fail', () => {

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Tasks.insert = jest.fn(() => {
            throw new Error("Database not available");
        });
        await InsertTask(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        expect(dependencies.Operations.Tasks.insert).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Database not available")
        );
        
    });

    test('Should return 404 board not found', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => {});
        await InsertTask(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        expect(dependencies.Operations.Tasks.insert).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.NOT_FOUND, ErrorMessages.BOARD_NOT_FOUND
        );
        
    });
});