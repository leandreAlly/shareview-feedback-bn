import { User } from '../database/models';

export const register = async (user) => {
  return await User.create(user);
};
