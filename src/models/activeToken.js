const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class ActiveToken extends Model {}

ActiveToken.init(
  {
    token: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'activeToken',
  }
);

module.exports = ActiveToken