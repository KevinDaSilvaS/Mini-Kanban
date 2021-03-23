const joi = require('joi');

const getAllQuery = joi.object({
    page: joi.number().positive(),
    limit: joi.number().positive()
});

module.exports = {getAllQuery};