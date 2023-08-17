import { blackListToken, findToken } from '../services/jwt.service';
import { getUserByEmail, getUserById } from '../services/user.service';
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
  const { token } = req.params;
  const decoded = verifyToken(token);

  if (decoded) {
    await blackListToken(token);
    req.user = decoded;

    next();
  } else {
    return res.status(403).json({ message: 'Failed to verify email' });
  }
};

export const checkIfTokenRevoked = async (req, res, next) => {
  const { token } = req.params;

  const isRevoked = await findToken(token);

  if (isRevoked) {
    return res
      .status(403)
      .json({ message: 'Error occurred while verifying your account' });
  }

  next();
};

export const checkIfUserIsVerified = async (req, res, next) => {
  const { email } = req.body;

  const isVerified = await getUserByEmail(email);
  if (!isVerified.isEmailVerified) {
    return res.status(403).json({ message: 'User email is not verified.' });
  }
  next();
};

export const CheckEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (!user) return res.status(404).json({ message: 'Email does not exist' });

  req.user = user;
  next();
};

export const VerifyResetPasswordToken = async (req, res, next) => {
  const { token } = req.params;
  const verify = verifyToken(token);
  const { id } = verify;
  req.id = id;

  const user = await getUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  next();
};
