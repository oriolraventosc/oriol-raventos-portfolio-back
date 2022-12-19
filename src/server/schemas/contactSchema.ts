import Joi from "joi";

const contactSchema = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    telephone: Joi.number().min(5),
    message: Joi.string(),
  }),
};

export default contactSchema;
