const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const DeleteTask = require('../../../src/controllers/tasks/DeleteTask');

const dependencies = {
    response: (res, status, message) => ({status, message}),
    Status,
    ErrorMessages,
    Operations: {
        Tasks: {
            delete: jest.fn(() => ({n:3}))
        }
    },
    AmqpBroker: {
        publish: jest.fn()
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
    },
    channel: {
        publish: () => {}
    }
}

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    params: {
        taskId: 'task_id',
    }
}

describe('Sucess', () => {
    test('Should delete task successfully', async () => {

        const deletedTask = await DeleteTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        
        expect(deletedTask.status).toEqual(Status.NO_CONTENT);
        
    });
});

describe('Fail', () => {
    test('Should return 404 error task not found', async () => {

        dependencies.Operations.Tasks.delete = jest.fn(() => ({n:0}));
        const deletedTask = await DeleteTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        
        expect(deletedTask).toEqual({
            status: Status.NOT_FOUND,
            message: ErrorMessages.TASK_NOT_FOUND
        });
        
    });

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Tasks.delete = jest.fn(() => {
            throw new Error("Database not available");
        });
        const deletedTask = await DeleteTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.delete).toHaveBeenCalled();
        
        expect(deletedTask.status).toEqual(Status.INTERNAL_SERVER_ERROR);
        
    });
});