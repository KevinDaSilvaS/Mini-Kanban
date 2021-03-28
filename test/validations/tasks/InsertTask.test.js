const {insertTask} = require('../../../src/validations/');
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

    expect(insertTask(req, res)).toEqual(true);
});

test('Should fail validations because of forbidden data', () => {
    expect(insertTask({body: {
        _id: "123",
        title: "board name"
    }}, res)).toEqual(false);
});

test('Should fail validations because of missing required fields', () => {
    expect(insertTask({body: {}}, res)).toEqual(false);
});

test('Should fail validations because of non valid status', () => {
    expect(insertTask({body: {title: 'new Board',
    status: 'Another_Status'}}, res)).toEqual(false);
});

test('Should fail validations because of non string fields', () => {
    expect(insertTask({body: {
        title: 123,
        description : 123,
        status: TO_DO
    }}, res)).toEqual(false);
});