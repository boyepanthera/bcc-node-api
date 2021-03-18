import Joi from "joi";

const userValidationSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  confirmPassword: Joi.ref("password"),
});

const loginValidationSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

export const ValidateRegistrationData = async (data) => {
  let { error, value } = await userValidationSchema.validate(data);
  return {
    err: error,
    value,
  };
};

export const ValidateLoginData = async (data) => {
  let { error, value } = loginValidationSchema.validate(data);
  return {
    err: error,
    value,
  };
};
