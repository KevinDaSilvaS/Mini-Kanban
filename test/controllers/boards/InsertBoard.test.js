const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const InsertBoard = require('../../../src/controllers/boards/InsertBoard');

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})),
    Status,
    ErrorMessages,
    Operations: {
        Boards: {
            insert: jest.fn(() => ({ 
                _id: '_id', 
                title: 'title', 
                description: 'description' 
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
    }
}

describe('Sucess', () => {
    test('Should insert a board successfully', async () => {

        await InsertBoard(req, res, dependencies);
        expect(dependencies.Operations.Boards.insert).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.CREATED, { 
                                    boardId: '_id', 
                                    title: 'title', 
                                    description: 'description' 
                                }
        );
        
    });
});

describe('Fail', () => {

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.insert = jest.fn(() => {
            throw new Error("Database not available");
        });
        await InsertBoard(req, res, dependencies);
        expect(dependencies.Operations.Boards.insert).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Database not available")
        );
        
    });
});