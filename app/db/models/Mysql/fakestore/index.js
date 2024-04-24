const { Cart } = require('./cart');
const { Order } = require('./order');

Cart.hasMany(Order);

module.exports = {
  Cart,
  Order,
};
