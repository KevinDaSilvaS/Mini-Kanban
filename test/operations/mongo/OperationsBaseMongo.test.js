const BaseOperationsMongo = require('../../../src/operations/mongo/OperationsBaseMongo');

class Model {
    constructor(data) {
        this.data = data;
    }

    save() {
        return this.data;
    }
}

const model = Model;

describe('Sucess', () => {
    describe('Insert', () => {
        test('Should insert register correctly', async () => {
            const operations = new BaseOperationsMongo(model);
            try {
                const result = await operations.insert({title: 'any_title'});
                expect(result).toEqual({title: 'any_title'});

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });

    });

    describe('Update', () => {
        test('Should update register correctly', async () => {
            const model = {
                updateMany: jest.fn(() => ({n:3}))
            };

            const operations = new BaseOperationsMongo(model);
            try {
                const result = await operations.update({}, {title: 'any_title'});
                expect(model.updateMany).toHaveBeenCalled();
                expect(result).toEqual({n: 3});

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });

    });

    describe('Find One', () => {
        test('Should find one register correctly', async () => {
            const model = {
                findOne: jest.fn(() => ({}))
            };

            const operations = new BaseOperationsMongo(model);
            try {
                const result = await operations.get({});
                expect(model.findOne).toHaveBeenCalled();
                expect(result).toEqual({});

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });
    });

    describe('Get all', () => {
        test('Should find all registers correctly', async () => {
            const model = {
                find: jest.fn(() => ({}))
            };

            const operations = new BaseOperationsMongo(model);
            try {
                const result = await operations.getAll({});
                expect(model.find).toHaveBeenCalled();
                expect(result).toEqual({});

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });
    });

    describe('Delete', () => {
        test('Should delete all registers correctly', async () => {
            const model = {
                deleteMany: jest.fn(() => ({n: 3}))
            };

            const operations = new BaseOperationsMongo(model);
            try {
                const result = await operations.delete({});
                expect(model.deleteMany).toHaveBeenCalled();
                expect(result).toEqual({n: 3});

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });
    });

    describe('Get paginated', () => {
        test('Should find all registers correctly with pagination', async () => {
            const model = {
                find: jest.fn(() => ({
                    skip: () => ({
                        limit: () => {}
                    }),
                }))
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.getPaginated({}, 1, 10);
                expect(model.find).toHaveBeenCalled();

            } catch (error) {
                expect(error).toEqual(new Error('Not expected error'));
            }
        });
    });
});

describe('Fail', () => {
    describe('Insert', () => {
        test('Should return error when insert method is not called correctly', async () => {
            class Model {
                constructor(data) {
                    this.data = data;
                }
            
                save() {
                    throw new Error('Any_Error');
                }
            }
            const model = Model;
            const operations = new BaseOperationsMongo(model);
            try {
                await operations.insert({title: 'any_title'});

            } catch (error) {
                expect(error).toEqual(new Error('Any_Error'));
            }
        });

    });

    describe('Update', () => {
        test('Should return error when update method is not called correctly', async () => {
            const model = {
                updateMany: jest.fn(() => {
                    throw new Error('Any_Error');
                })
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.update({}, {title: 'any_title'});
            } catch (error) {
                expect(model.updateMany).toHaveBeenCalled();
                expect(error).toEqual(new Error('Any_Error'));
            }
        });

    });

    describe('Find One', () => {
        test('Should return error when get method is not called correctly', async () => {
            const model = {
                findOne: jest.fn(() => {
                    throw new Error('Any_Error');
                })
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.get({});

            } catch (error) {
                expect(model.findOne).toHaveBeenCalled();
                expect(error).toEqual(new Error('Any_Error'));
            }
        });
    });

    describe('Get all', () => {
        test('Should return error when getAll method is not called correctly', async () => {
            const model = {
                find: jest.fn(() => {
                    throw new Error('Any_Error');
                })
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.getAll({});

            } catch (error) {
                expect(model.find).toHaveBeenCalled();
                expect(error).toEqual(new Error('Any_Error'));
            }
        });
    });

    describe('Delete', () => {
        test('Should return error when delete method is not called correctly', async () => {
            const model = {
                deleteMany: jest.fn(() => {
                    throw new Error('Any_Error');
                })
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.delete({});

            } catch (error) {
                expect(model.deleteMany).toHaveBeenCalled();
                expect(error).toEqual(new Error('Any_Error'));
            }
        });
    });

    describe('Get paginated', () => {
        test('Should return error when getPaginated method is not called correctly', async () => {
            const model = {
                find: jest.fn(() => {
                    throw new Error('Any_Error');
                })
            };

            const operations = new BaseOperationsMongo(model);
            try {
                await operations.getPaginated({}, 1, 10);
            } catch (error) {
                expect(model.find).toHaveBeenCalled();
                expect(error).toEqual(new Error('Any_Error'));
            }
        });
    });
});