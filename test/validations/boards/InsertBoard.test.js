const {insertBoard} = require('../../../src/validations/');

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

    expect(insertBoard(req, res)).toEqual(true);
});

test('Should fail validations because of forbidden data', () => {
    expect(insertBoard({body: {
        _id: "123",
        title: "board name"
    }}, res)).toEqual(false);
});

test('Should fail validations because of missing required fields', () => {
    expect(insertBoard({body: {}}, res)).toEqual(false);
});