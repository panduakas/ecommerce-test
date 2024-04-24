/* eslint-disable import/no-extraneous-dependencies */
const { Model, Sequelize } = require('sequelize');
const { sequelize } = require('../index');

class Order extends Model {}
Order.init({
  id: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: Sequelize.STRING,
  },
  cartId: {
    allowNull: false,
    type: Sequelize.STRING,
    references: {
      model: 'cart',
      key: 'id',
    },
  },
  productId: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  quantity: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  productPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  totalPrice: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  image: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  category: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  orderStatus: {
    allowNull: false,
    type: Sequelize.ENUM('SUCCESS', 'FAILED'),
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Order',
  tableName: 'order',
});

module.exports = {
  Order,
};
