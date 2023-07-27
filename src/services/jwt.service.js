import { BlackList } from '../database/models';

export const blackListToken = async (token) => {
  return await BlackList.create({ token });
};

export const findToken = async (token) => {
  return await BlackList.findOne({ where: { token } });
};
