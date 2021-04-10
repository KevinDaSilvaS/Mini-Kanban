const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const GetBoardById = require('../../../src/controllers/boards/GetBoardById');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
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
        boardId: 'board_id',
    }
}

describe('Sucess', () => {
    test('Should get board successfully', async () => {

        await GetBoardById(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
    });
});

describe('Fail', () => {
    test('Should return 404 error board not found', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => (null));
        const board = await GetBoardById(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
        expect(board).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.BOARD_NOT_FOUND
        });
        
    });

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.get = jest.fn(() => {
            throw new Error("Database not available");
        });
        await GetBoardById(req, res, dependencies);
        expect(dependencies.Operations.Boards.get).toHaveBeenCalled();
        
    });
});