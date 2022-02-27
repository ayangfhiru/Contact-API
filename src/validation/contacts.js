const Joi = require('joi');

const validationContact = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    year: Joi.number().required(),
    gender: Joi.string().required(),
    ph_number: Joi.string().required(),
    blood: Joi.string().required(),
    city: Joi.string().required()
});

module.exports = validationContact;