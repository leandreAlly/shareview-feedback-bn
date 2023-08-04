const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlackList extends Model {
    static associate(models) {}
  }
  BlackList.init(
    {
      token: DataTypes.CHAR(1500),
    },
    {
      sequelize,
      modelName: 'BlackList',
    },
  );
  return BlackList;
};
