import { getUserByEmail } from '../services/user.service';
import { verifyToken } from '../utils/jwt.util';

export const isEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (user) {
    return res
      .status(409)
      .json({ message: 'User with email already registered' });
  }

  next();
};

export const verifyAndRevokeToken = async (req, res, next) => {
  const token = req.params.token;
  const decoded = verifyToken(token);

  if (decoded) {
    // TODO: Blacklist token
    req.user = decoded;

    next();
  } else {
    return res.status(403).json({ message: 'Failed to to verify email' });
  }
};
