const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const GetBoards = require('../../../src/controllers/boards/GetBoards');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
        Boards: {
            getPaginated: jest.fn(() => ([{
                _id: "id", title: "title", description: "description"
            }])) 
        }
    }
}

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    query: {
        limit: 1,
        page: 1,
    }
}

describe('Sucess', () => {
    test('Should get boards successfully', async () => {

        await GetBoards(req, res, dependencies);
        expect(dependencies.Operations.Boards.getPaginated).toHaveBeenCalled();
        
    });
});

describe('Fail', () => {

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Boards.getPaginated = jest.fn(() => {
            throw new Error("Database not available");
        });
        await GetBoards(req, res, dependencies);
        expect(dependencies.Operations.Boards.getPaginated).toHaveBeenCalled();
        
    });
});