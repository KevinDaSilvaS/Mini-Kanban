const joi = require('joi');

const taskPostBody = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    status: joi.string(),
});
    
const taskPatchBody = joi.object({
    title: joi.string(),
    description: joi.string(),
    status: joi.string(),
    boardId: joi.forbidden()
});

module.exports = {taskPostBody, taskPatchBody};