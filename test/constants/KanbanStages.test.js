const KanbanStages = require('../../src/constants/KanbanStages');

test('Should have the keys and values equal as the values expected', () => {
    expect(KanbanStages).toEqual(
    {
        TO_DO: 'TO DO',
        DOING: 'DOING',
        DONE: 'DONE',
    });
});