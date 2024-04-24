const { sendRequest } = require('../../request/requestDefault');

const toService = 'FAKE-STORE-API';
class Inventory {
  static async getListProduct({
    limit,
    sort,
    requestId
  }) {
    const requestConfig = {
      toService,
      url: `${process.env.FAKE_STORE_API_URL}/products`,
      method: 'GET',
      params: {
        limit,
        sort
      },
      message: 'GET LIST PRODUCT FROM FAKE STORE API',
      requestId,
    };
    const result = await sendRequest(requestConfig);

    return result;
  }

  static async getOneProductById({
    productId,
    requestId
  }) {
    const requestConfig = {
      toService,
      url: `${process.env.FAKE_STORE_API_URL}/products/${productId}`,
      method: 'GET',
      message: 'GET ONE PRODUCT FROM FAKE STORE API',
      requestId,
    };
    const result = await sendRequest(requestConfig);

    return result;
  }
}

module.exports = {
  Inventory,
};
