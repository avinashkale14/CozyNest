const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),

        category: Joi.string()
            .valid(
                "trending",
                "rooms",
                "iconic-cities",
                "mountains",
                "castles",
                "amazing-pools",
                "camping",
                "farms",
                "arctic",
                "domes"
            )
            .required(),

        image: Joi.object({
            url: Joi.string().allow("", null)
        }).optional()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
        .min(1)
        .max(5)
        .required(),

        comment: Joi.string()
            .required()
            .messages({
                "string.empty": "Please write a review.",
                "any.required": "Please write a review."
            })
    }).required()
});