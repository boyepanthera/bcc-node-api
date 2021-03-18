import Joi from "joi";

const userValidationSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  confirmPassword: Joi.ref("password"),
});

export const ValidateRegistrationData = async (data) => {
  let { error, value } = userValidationSchema.validate(data);
  return {
    err: error,
    value,
  };
};
