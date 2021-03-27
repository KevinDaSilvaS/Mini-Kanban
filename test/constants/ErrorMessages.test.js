const ErrorMessages = require('../../src/constants/ErrorMessages');

test('Should have the keys and values equal as the values expected', () => {
    expect(ErrorMessages).toEqual(
    {
        BOARD_NOT_FOUND: "Board not found.",
        ERROR_UPDATE_BOARD: "Unable to update board.",
        TASK_NOT_FOUND: "Task not found.",
        ERROR_UPDATE_TASK: "Unable to update task.",
    });
});