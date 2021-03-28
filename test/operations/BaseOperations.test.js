const BaseOperations = require('../../src/operations/BaseOperations');

const operations = new BaseOperations;

describe('Sucess', () => {
    test('Should get not implemented error in insert method', async () => {
        try {
            operations.insert({});
        } catch (error) {
            expect(error).toEqual(new Error('Not implemented'));
        }
    });

    test('Should get not implemented error in update method', async () => {
        try {
            operations.update({});
        } catch (error) {
            expect(error).toEqual(new Error('Not implemented'));
        }
    });

    test('Should get not implemented error in get method', async () => {
        try {
            operations.get({});
        } catch (error) {
            expect(error).toEqual(new Error('Not implemented'));
        }
    });

    test('Should get not implemented error in getAll method', async () => {
        try {
            operations.getAll({});
        } catch (error) {
            expect(error).toEqual(new Error('Not implemented'));
        }
    });

    test('Should get not implemented error in delete method', async () => {
        try {
            operations.delete({});
        } catch (error) {
            expect(error).toEqual(new Error('Not implemented'));
        }
    });

});