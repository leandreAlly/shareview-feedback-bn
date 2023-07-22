import { User } from '../database/models';

export const register = async (user) => {
  return await User.create(user);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
