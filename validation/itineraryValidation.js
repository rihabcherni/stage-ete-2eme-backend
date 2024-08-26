const Joi = require('joi');

const itinerarySchema = Joi.object({
    trainId: Joi.string().required(),
    route: Joi.array().items(
        Joi.object({
            station: Joi.string().required(),
            arrivalTime: Joi.date().required(),
            departureTime: Joi.date().required()
        })
    ).required(),
    optimized: Joi.boolean().optional(),
    carbonEmissions: Joi.number().required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

module.exports = { itinerarySchema };
