import Joi from "joi";

const userValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9]{3,30}$"),
      "password can only contain letters and numbers"
    )
    .required(),
  email: Joi.string()
    .email(
      {
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      },
      "only .com and .net emails are allowed"
    )
    .required(),
  confirmPassword: Joi.ref("password"),
});

const userUpdateValidationSchema = Joi.object({
  password: Joi.string().pattern(
    new RegExp("^[a-zA-Z0-9]{3,30}$"),
    "password can only contain letters and numbers"
  ),
  confirmPassword: Joi.ref("password"),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
});

const loginValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9]{3,30}$"),
      "password can only contain letters and numbers"
    )
    .required(),
  email: Joi.string()
    .email(
      {
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      },
      "only .com and .net emails are allowed"
    )
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

export const ValidateUserUpdateData = async (data) => {
  let { error, value } = userUpdateValidationSchema.validate(data);
  return {
    err: error,
    value,
  };
};
