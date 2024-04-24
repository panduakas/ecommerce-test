/* eslint-disable import/no-extraneous-dependencies */
const { Order } = require('../db/models/Mysql/fakestore/index');
const { wrapFunc } = require('../helpers');

const defaultErrorMessage = 'Operation Failed: Order';

const createOrder = (data) =>
  Order.create(data);

module.exports = {
  createOrder: (data) =>
    wrapFunc(
      createOrder(data),
      defaultErrorMessage
    ),
};
