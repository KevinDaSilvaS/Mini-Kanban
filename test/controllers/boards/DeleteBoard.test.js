const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const DeleteBoard = require('../../../src/controllers/boards/DeleteBoard');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
        Tasks: {
            delete: jest.fn(() => ({n:3}))
        },
        Boards: {
            delete: jest.fn(() => ({n:3})) 
        }
    },
    AmqpBroker: {
        publish: () => {}
    },
    BrokerInfo: {
        exchanges: {
            topic_mini_kanban: {
                exchange: 'exchange_name'
            }
        },
        queues: {
            delete_all_comments_when_task_or_board_is_deleted: 'queue_name'
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
    test('Should delete board successfully', async () => {

        const deletedBoard = await DeleteBoard(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        expect(dependencies.Operations.Boards.delete).toHaveBeenCalled();
        
        expect(deletedBoard.status).toEqual(Status.NO_CONTENT);
        
    });
});

describe('Fail', () => {
    test('Should return 404 error board not found', async () => {

        dependencies.Operations.Boards.delete = jest.fn(() => ({n:0}));
        const deletedBoard = await DeleteBoard(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        expect(dependencies.Operations.Boards.delete).toHaveBeenCalled();
        
        expect(deletedBoard).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.BOARD_NOT_FOUND
        });
        
    });

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Tasks.delete = jest.fn(() => {
            throw new Error("Database not available");
        });
        const deletedBoard = await DeleteBoard(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        
        expect(deletedBoard.status).toEqual(Status.INTERNAL_SERVER_ERROR);
        
    });
});