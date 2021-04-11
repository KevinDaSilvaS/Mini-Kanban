const Status = require('../../../src/constants/HttpCodes');
const ErrorMessages = require('../../../src/constants/ErrorMessages');
const UpdateTask = require('../../../src/controllers/tasks/UpdateTask');

const dependencies = {
    response: jest.fn((res, status, message) => ({status, message})),
    Status,
    ErrorMessages,
    Operations: {
        Tasks: {
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
        taskId: 'task_id'
    }
}

describe('Sucess', () => {
    test('Should update a task successfully', async () => {

        await UpdateTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.NO_CONTENT, undefined
        );
        
    });
});

describe('Fail', () => {

    test('Should return 500 internal server error', async () => {

        dependencies.Operations.Tasks.update = jest.fn(() => {
            throw new Error("Database not available");
        });
        await UpdateTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.INTERNAL_SERVER_ERROR, new Error("Database not available")
        );
        
    });

    test('Should return 400 error updating task', async () => {

        dependencies.Operations.Tasks.update = jest.fn(() => ({ok: 0}));
        await UpdateTask(req, res, dependencies);
        expect(dependencies.Operations.Tasks.update).toHaveBeenCalled();
        
        expect(dependencies.response).toHaveBeenCalledWith(res, 
            Status.BAD_REQUEST, ErrorMessages.ERROR_UPDATE_TASK
        );
        
    });
});