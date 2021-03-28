const {updateTask} = require('../../../src/validations/');
const {TO_DO} = require('../../../src/constants/KanbanStages');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    body: {
        title: 'new Board',
        description : 'board test',
        status: TO_DO
    }
}

test('Should pass validations', () => {

    expect(updateTask(req, res)).toEqual(true);
});

test('Should fail validations because of forbidden data', () => {
    expect(updateTask({body: {
        _id: "123",
        title: "board name"
    }}, res)).toEqual(false);
});

test('Should fail validations because of non valid status', () => {
    expect(updateTask({body: {title: 'new Board',
    status: 'Another_Status'}}, res)).toEqual(false);
});

test('Should fail validations because of non string fields', () => {
    expect(updateTask({body: {
        title: 123,
        description : 123,
        status: TO_DO
    }}, res)).toEqual(false);
});