const model = require('../../../src/database/mongo/models/Boards');
const OperationsBaseMongo = require('../../../src/operations/mongo/OperationsBaseMongo');

const operations = new OperationsBaseMongo(model);

describe('Sucess', () => {
    test('Should call insert method successfully', async () => {
        try {
            const insertedData = await operations.insert({
                title: "title"
            });
            expect(insertedData.title).toEqual("title");
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });

    test('Should call update method successfully', async () => {
        try {
            const updatedData = await operations.update(
            { title: "title" }, { title: "updated" });
            expect(updatedData.ok).toBeGreaterThanOrEqual(1);
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });

    test('Should call get method successfully', async () => {
        try {
            const getData = await operations.get({ title: "updated" });
            expect(getData.title).toEqual("updated");
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });

    test('Should call getAll method successfully', async () => {
        try {
            const getData = await operations.getAll({});
            expect(getData.length).toBeGreaterThanOrEqual(1);
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });

    test('Should call getPaginated method successfully', async () => {
        try {
            const getData = await operations.getPaginated({});
            expect(getData.length).toBeGreaterThanOrEqual(1);
            expect(getData.length).toBeLessThanOrEqual(10);
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });

    test('Should call delete method successfully', async () => {
        try {
            const deleteData = await operations.delete({});
            expect(deleteData.n).toBeGreaterThanOrEqual(1);
        } catch (error) {
            expect(error).toEqual(undefined);
        }
    });
});

describe('Fail', () => {
    test('Should call insert method and return an error', async () => {
        try {
            await operations.insert(new Error("error"));
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });

    test('Should call update method and return an error', async () => {
        try {
            await operations.update(new Error("error"), new Error("error"));
            
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });

    test('Should call get method and return an error', async () => {
        try {
            await operations.get(new Error("error"));
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });

    test('Should call getAll method and return an error', async () => {
        try {
            await operations.getAll(new Error("error"));
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });

    test('Should call getPaginated method and return an error', async () => {
        try {
            await operations.getPaginated(new Error("error"));
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });

    test('Should call delete method and return an error', async () => {
        try {
            await operations.delete(new Error("error"));
        } catch (error) {
            expect(error).not.toEqual(undefined);
        }
    });
});