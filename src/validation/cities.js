const Joi = require('joi');

const validateCitie = Joi.object({
    name: Joi.string().required()
});

module.exports = validateCitie;