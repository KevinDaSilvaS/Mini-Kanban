const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const UpdateBoard = require('../../../src/controllers/boards/UpdateBoard');

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})),
    Status,
    ErrorMessages,
    Operations: {
        Boards: {
            update: jest.fn(() => ({ ok: 1 }))
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
        boardId: 'task_id'
    }
}

describe('Sucess', () => {
    test('Should update a board successfully', async () => {

        await UpdateBoard(req, res, dependencies);
        expect(dependencies.Operations.Boards.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.NO_CONTENT, undefined
        );
        
    });
});

describe('Fail', () => {

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.update = jest.fn(() => {
            throw new Error("Database not available");
        });
        await UpdateBoard(req, res, dependencies);
        expect(dependencies.Operations.Boards.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Database not available")
        );
        
    });

    test('Should return 400 error updating board', async () => {

        dependencies.Operations.Boards.update = jest.fn(() => ({ok: 0}));
        await UpdateBoard(req, res, dependencies);
        expect(dependencies.Operations.Boards.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.ERROR_UPDATE_BOARD
        );
        
    });
});