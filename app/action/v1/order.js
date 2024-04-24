/* eslint-disable import/no-extraneous-dependencies */
const Queue = require('bull');

const cuid = require('cuid');
const upperCase = require('lodash/upperCase');
const get = require('lodash/get');
const { createCart, findByRefId } = require('../../bridge/cart');
const { Inventory } = require('./inventory');
const { createOrder } = require('../../bridge/order');

const queue = new Queue('Order queue');

class Order extends Inventory {
  static generateReferenceId() {
    const result = `VA-${upperCase(cuid()).replace(/ /g, '')}`;
    return result;
  }

  static async insertDataCart({
    requestId,
  }) {
    const payloadInsertCart = {
      id: requestId,
      referenceId: this.generateReferenceId(),
      trxStatus: 'ONPROCESS',
    };

    const result = await createCart(payloadInsertCart);

    return result;
  }

  static async queue() {
    return queue.process(async (job) => {
      const referenceId = get(job, 'data.referenceId');
      const requestId = get(job, 'data.requestId');
      const quantity = get(job, 'data.quantity');

      const productId = get(job, 'data.productId');
      const payloadinsertOrder = {
        id: requestId,
        productId,
        orderStatus: 'SUCCESS',
        quantity
      };
      try {
        const checkCart = await findByRefId({
          referenceId
        });

        payloadinsertOrder.cartId = get(checkCart, 'id');

        const checkProductResult = await this.getOneProductById({
          requestId,
          productId,
        });

        if (!checkProductResult) {
          throw new Error('Product not found');
        } else {
          payloadinsertOrder.title = get(checkProductResult, 'title');
          payloadinsertOrder.productPrice = get(checkProductResult, 'price');
          payloadinsertOrder.description = get(checkProductResult, 'description');
          payloadinsertOrder.image = get(checkProductResult, 'image');
          payloadinsertOrder.category = get(checkProductResult, 'category');
          payloadinsertOrder.totalPrice = Number(get(checkProductResult, 'price')) * quantity;
        }
      } catch (err) {
        payloadinsertOrder.orderStatus = 'FAILED';
      }
      const insertData = await createOrder(payloadinsertOrder);
      return insertData;
    });
  }
}

module.exports = {
  Order,
};
