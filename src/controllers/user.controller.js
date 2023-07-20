import { register } from '../services/user.service';
import { hashPassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';

export const registerUser = async (req, res) => {
  try {
    const user = {
      ...req.body,
      usesPassword: true,
      lastTimePasswordUpdated: new Date(),
    };
    user.password = await hashPassword(req.body.password);
    const { id, email, role, lastTimePasswordUpdated } = await register(user);
    const userData = { id, email, role, lastTimePasswordUpdated };
    const userToken = generateToken(userData);

    return res.status(201).json({
      message: 'Successfully registered',
      user: userData,
      token: userToken,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to register a new user',
    });
  }
};
