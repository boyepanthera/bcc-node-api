import Joi from "joi";

const postValidationSchema = Joi.object({
  body: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  title: Joi.string().required(),
});

export const ValidatePostData = async (data) => {
  let { error, value } = postValidationSchema.validate(data);
  return {
    err: error,
    value,
  };
};
