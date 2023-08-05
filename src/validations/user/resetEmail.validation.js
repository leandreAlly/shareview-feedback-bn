import Joi from 'joi';
import validateRequest from '../../utils/validation.util';

const validateEmail = async (req, res, next) => {
  const emailSchema = Joi.object().keys({
    email: Joi.string().email().required(),
  });

  const validationError = validateRequest(emailSchema, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  next();
};

export default validateEmail;
