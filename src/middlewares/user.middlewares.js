import { getUserByEmail } from '../services/user.service';

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
