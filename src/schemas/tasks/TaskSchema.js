const joi = require('joi');
const kanbanStages = require('../../constants/KanbanStages');

const taskPostBody = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    status: joi.string().valid(...Object.values(kanbanStages)),
});
    
const taskPatchBody = joi.object({
    title: joi.string(),
    description: joi.string(),
    status: joi.string().valid(...Object.values(kanbanStages)),
    boardId: joi.forbidden()
});

module.exports = {taskPostBody, taskPatchBody};