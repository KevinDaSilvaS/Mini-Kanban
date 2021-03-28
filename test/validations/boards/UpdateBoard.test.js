const {updateBoard} = require('../../../src/validations/');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    body: {
        title: 'new Board',
        description : 'board test'
    }
}

test('Should pass validations', () => {

    expect(updateBoard(req, res)).toEqual(true);
});

test('Should fail validations because of forbidden data', () => {
    expect(updateBoard({body: {
        _id: "123",
        title: "board name"
    }}, res)).toEqual(false);
});

test('Should fail validations because of non string fields', () => {
    expect(updateBoard({body: {
        title: 123,
        description : 123,
    }}, res)).toEqual(false);
});
