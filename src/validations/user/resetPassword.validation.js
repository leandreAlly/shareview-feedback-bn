import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import validateRequest from '../../utils/validation.util';

const joiPassword = Joi.extend(joiPasswordExtendCore);
const validateNewPassword = async (req, res, next) => {
  const passwordSchema = Joi.object().keys({
    newPassword: joiPassword
      .string()
      .min(8)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
      .trim(),
  });

  const validationError = validateRequest(passwordSchema, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  next();
};

export default validateNewPassword;
