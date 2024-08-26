const Joi = require('joi');

const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('administrateur', 'client', 'conducteur', 'operateur').required(),
  phone: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow(''),
  ville: Joi.string().optional().allow(''),
  date_of_birth: Joi.date().optional().allow(null),
  is_verified: Joi.boolean().optional(),
  is_accepted: Joi.boolean().optional(),
  photo: Joi.string().optional().allow(''),
  company: Joi.when('role', {
    is: 'client',
    then: Joi.string().required(),
    otherwise: Joi.string().optional().allow('')
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };

