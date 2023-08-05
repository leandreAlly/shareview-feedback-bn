import { User } from '../database/models';

export const register = async (user) => {
  return await User.create(user);
};

export const updateUser = async (fields, id) => {
  return await User.update({ ...fields }, { where: { id: id } });
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};
