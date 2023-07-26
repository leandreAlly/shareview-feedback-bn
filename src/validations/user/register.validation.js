import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import validateRequest from '../../utils/validation.util';

const joiPassword = Joi.extend(joiPasswordExtendCore);
const validateRegister = async (req, res, next) => {
  const registerSchema = Joi.object().keys({
    firstname: Joi.string().min(3).trim().required(),
    lastname: Joi.string().min(3).trim().required(),
    email: Joi.string()
      .lowercase()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'org', 'co'] },
      })
      .required(),
    password: joiPassword
      .string()
      .min(8)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
      .trim(),
  });

  const validationError = validateRequest(registerSchema, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  next();
};

export default validateRegister;
