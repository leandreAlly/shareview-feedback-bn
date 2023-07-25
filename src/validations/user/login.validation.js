import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import validateRequest from '../../utils/validation.util';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validateLogin = async (req, res, next) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: joiPassword.string().required(),
  });

  const validationError = validateRequest(loginSchema, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  next();
};

export default validateLogin;
