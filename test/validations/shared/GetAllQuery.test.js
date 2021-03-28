const {getAllQuery} = require('../../../src/validations/');

const res = {
    send: jest.fn(),
    status: jest.fn(() => res)
};

const req = {
    query: {
        limit: 1,
        page : 1
    }
}

test('Should pass validations', () => {

    expect(getAllQuery(req, res)).toEqual(true);
});

test('Should fail validations because of non positive limit', () => {
    expect(getAllQuery({query: {
        limit: 0,
    }}, res)).toEqual(false);
});

test('Should fail validations because of non numeric limit', () => {
    expect(getAllQuery({query: {
        limit: "abc",
    }}, res)).toEqual(false);
});

test('Should fail validations because of non positive page', () => {
    expect(getAllQuery({query: {
        page: 0,
    }}, res)).toEqual(false);
});

test('Should fail validations because of non numeric page', () => {
    expect(getAllQuery({query: {
        page: "abc",
    }}, res)).toEqual(false);
});