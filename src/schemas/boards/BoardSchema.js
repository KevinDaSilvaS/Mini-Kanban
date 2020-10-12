const joi = require('joi');

const boardPostBody = joi.object({
    title: joi.string().required(),
    description: joi.string()
});
    
const boardPatchBody = joi.object({
    title: joi.string(),
    description: joi.string()
});

module.exports = {boardPostBody, boardPatchBody};