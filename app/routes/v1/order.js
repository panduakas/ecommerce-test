/* eslint-disable import/no-extraneous-dependencies */
const get = require('lodash/get');
const head = require('lodash/head');
const Queue = require('bull');

const queue = new Queue('Order queue');

const { wrap } = require('../../helpers');
const { Order } = require('../../action/v1/order');

const addNewCartAppi = async (req) => {
  const requestId = get(req, 'requestId');

  const result = await Order.insertDataCart({
    requestId,
  });

  return result;
};

const orderApi = async (req) => {
  req
    .checkBody('referenceId')
    .not()
    .isEmpty()
    .withMessage('referenceId is required');

  req
    .checkBody('productId')
    .not()
    .isEmpty()
    .withMessage('productId is required');
  req
    .checkBody('quantity')
    .not()
    .isEmpty()
    .withMessage('quantity is required')
    .customSanitizer((value) => Number(value));


  const errors = req.validationErrors();

  if (errors) {
    throw Object.assign(new Error('Validation Errors'), { data: head(errors) });
  }

  const referenceId = get(req, 'body.referenceId');
  const productId = get(req, 'body.productId');
  const requestId = get(req, 'requestId');
  const quantity = get(req, 'body.quantity');


  const payloadQueueAdd = {
    referenceId,
    productId,
    requestId,
    quantity
  };

  await queue.add(payloadQueueAdd);

  return 'Actions in queue';
};
module.exports = (router) => {
  router.get('/add-cart', wrap(addNewCartAppi));
  router.post('/', wrap(orderApi));
};
