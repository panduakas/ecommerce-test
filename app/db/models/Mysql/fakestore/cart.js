/* eslint-disable import/no-extraneous-dependencies */
const { Model, Sequelize } = require('sequelize');
const { sequelize } = require('../index');

class Cart extends Model {}
Cart.init({
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: Sequelize.STRING,
  },
  referenceId: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  trxStatus: {
    allowNull: false,
    type: Sequelize.ENUM('ONPROCESS', 'SUCCESS', 'FAILED'),
  },
  failureReason: {
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Cart',
  tableName: 'cart',
});

module.exports = {
  Cart,
};
